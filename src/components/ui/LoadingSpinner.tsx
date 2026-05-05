export default function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-solid border-blue-200"></div>
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-dashed border-blue-500 [animation-delay:0.5s]"></div>
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-dotted border-purple-500 [animation-delay:1s]"></div>
      </div>
    </div>
  );
}