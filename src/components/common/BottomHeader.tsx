"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useFetch } from "@/hooks/useFetch"
import { Menu, ChevronDown, X, HousePlus } from "lucide-react"
import { CategoryWithSub } from "@/types/categoryWithSub"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { slugify } from "@/utils/slugify"

const BottomHeader = () => {
  const { data: categoriesData } =
    useFetch<CategoryWithSub[]>("/categories-with-sub")

  const [categories, setCategories] = useState<CategoryWithSub[]>([])
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
    if (categoriesData) setCategories(categoriesData)
  }, [categoriesData])

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

              <DropdownMenuContent className="min-w-[220px] bg-white border shadow-xl p-2 rounded-md">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div
                      className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="font-semibold">{category.name}</span>
                      {category.sub_categories?.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expandedCategory === category.id
                              ? "rotate-180"
                              : ""
                            }`}
                        />
                      )}
                    </div>
                    <hr />
                    {expandedCategory === category.id &&
                      category.sub_categories?.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/subcategory/${slugify(sub.name)}/${sub.id}`}
                          className="block pl-6 py-1 text-gray-600 hover:text-red-600"
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
          <div className="flex items-center justify-between py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute w-64 h-[82vh] overflow-auto top-full -left-6 bg-white shadow-lg border-t z-50"
            >
              <div>
                <h3 className="font-bold text-lg mb-3 pt-4 px-2">
                  ALL CATEGORIES
                </h3>

                {categories.map((category) => (
                  <div key={category.id} className="border-b">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex justify-between w-full p-3 hover:bg-gray-50"
                    >
                      <span className="font-semibold">{category.name}</span>
                      {category.sub_categories?.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expandedCategory === category.id
                              ? "rotate-180"
                              : ""
                            }`}
                        />
                      )}
                    </button>

                    {expandedCategory === category.id &&
                      category.sub_categories?.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/subcategory/${slugify(sub.name)}/${sub.id}`}
                          className="block pl-6 py-2 text-gray-600 hover:text-red-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                ))}

                <nav className="mt-4">
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
