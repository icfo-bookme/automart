"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFetch } from "@/hooks/useFetch"
import { Menu, ChevronDown, X, HousePlus, ArrowUpRight, LayoutGrid } from "lucide-react"
import { CategoryWithSub } from "@/types/categoryWithSub"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { slugify } from "@/utils/slugify"

const BottomHeader = () => {
  const pathname = usePathname()
  const productLinkClass = (href: string, allProducts = false) =>
    `mx-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${pathname === href
      ? allProducts
        ? "font-semibold text-gray-900"
        : "bg-red-100 font-semibold text-red-700"
      : allProducts
        ? "font-semibold text-gray-700 hover:text-gray-900"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`
  const { data: categoriesData } =
    useFetch<CategoryWithSub[]>("/categories-with-sub")

  const categories = categoriesData || []
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const navItems = [
    { label: "SHOP", href: "/shop" },
    { label: "OFFER", href: "/offers" },
    { label: "CONTACT US", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
        setExpandedCategory(null)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [mobileMenuOpen])

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
    setExpandedCategory(null)
  }

  return (
    <>
      <header
        className={`hidden bg-[#222222] border-b-2 border-red-600 lg:block transition-all duration-200 ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start py-3 gap-6">
            <HousePlus className="text-white" />

            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700">
                  <Menu size={20} />
                  ALL CATEGORIES
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" sideOffset={10} className="w-80 max-w-[calc(100vw-2rem)] max-h-[min(70dvh,var(--radix-dropdown-menu-content-available-height))] overflow-y-auto rounded-xl border-gray-200 bg-white p-2 shadow-xl">
                <div className="mb-2 border-b border-gray-100 px-3 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Browse categories</p>
                </div>
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      type="button"
                      aria-expanded={expandedCategory === category.id}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${expandedCategory === category.id ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="font-semibold">{category.name}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-gray-400 transition-transform ${expandedCategory === category.id
                              ? "rotate-180"
                              : ""
                            }`}
                        />
                    </button>
                    {expandedCategory === category.id && (
                      <Link
                        href={`/category/${slugify(category.name)}/${category.id}`}
                        className={`${productLinkClass(`/category/${slugify(category.name)}/${category.id}`, true)} mt-1`}
                        aria-current={pathname === `/category/${slugify(category.name)}/${category.id}` ? "page" : undefined}
                        onClick={closeDropdown}
                      >
                        <LayoutGrid size={16} aria-hidden="true" />
                        <span className="flex-1">All Products</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                    {expandedCategory === category.id &&
                      category.sub_categories?.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/subcategory/${slugify(sub.name)}/${sub.id}`}
                          className={productLinkClass(`/subcategory/${slugify(sub.name)}/${sub.id}`)}
                          aria-current={pathname === `/subcategory/${slugify(sub.name)}/${sub.id}` ? "page" : undefined}
                          onClick={closeDropdown}
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="flex text-white gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-semibold hover:text-red-600 uppercase"
                  onClick={closeDropdown}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <header
        className={`lg:hidden sticky top-0 z-40 bg-white ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 ">
            <Button
              className="border border-gray-600"
              variant="ghost"
              size="icon"
              aria-label={mobileMenuOpen ? "Close category menu" : "Open category menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute left-3 top-full z-50 w-80 max-w-[calc(100vw-1.5rem)] max-h-[75dvh] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
            >
              <div>
                <h3 className="mb-2 border-b border-gray-100 px-3 py-3 text-xs font-semibold tracking-wider text-gray-400">
                  ALL CATEGORIES
                </h3>

                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      type="button"
                      aria-expanded={expandedCategory === category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg p-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${expandedCategory === category.id ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <span className="font-semibold">{category.name}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-gray-400 transition-transform ${expandedCategory === category.id
                              ? "rotate-180"
                              : ""
                            }`}
                        />
                    </button>

                    {expandedCategory === category.id && (
                      <Link
                        href={`/category/${slugify(category.name)}/${category.id}`}
                        className={`${productLinkClass(`/category/${slugify(category.name)}/${category.id}`, true)} mt-1`}
                        aria-current={pathname === `/category/${slugify(category.name)}/${category.id}` ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutGrid size={16} aria-hidden="true" />
                        <span className="flex-1">All Products</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}

                    {expandedCategory === category.id &&
                      category.sub_categories?.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/subcategory/${slugify(sub.name)}/${sub.id}`}
                          className={productLinkClass(`/subcategory/${slugify(sub.name)}/${sub.id}`)}
                          aria-current={pathname === `/subcategory/${slugify(sub.name)}/${sub.id}` ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                ))}

                <nav className="mt-3 border-t border-gray-100 pt-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block p-3 font-semibold hover:bg-gray-50 uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default BottomHeader
