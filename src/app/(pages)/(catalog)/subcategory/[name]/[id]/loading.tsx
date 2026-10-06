import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <>
  <div className="h-[80vh]">
    <LoadingSpinner />
  </div>
  </>
}