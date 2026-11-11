export default function Loading() {
  return (
    <div className="bg-(--secondary-color) overflow-hidden pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Main Grid: Match lg:grid-cols-[0.8fr_1.2fr] from page.jsx */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
          
          {/* Left Column: Image Gallery Skeleton */}
          <div className="animate-pulse flex flex-col gap-4">
            <div className="relative aspect-4/3 w-full rounded-2xl bg-gray-200 max-h-[500px]"></div>
            
            {/* Thumbnail Strip Skeleton */}
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square w-20 rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Column: Content Skeleton */}
          <div className="flex flex-col gap-6 animate-pulse">
            
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 rounded bg-gray-200"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </div>

            {/* Badges Skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-gray-200"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-10 w-3/4 rounded-lg bg-gray-200"></div>

            {/* Price Skeleton */}
            <div className="h-8 w-32 rounded-lg bg-gray-200"></div>

            {/* Buy Section Skeleton (Quantity + Add to Cart side-by-side) */}
            <div className="mt-8 mb-4 flex gap-4">
              <div className="h-12 w-32 rounded-xl bg-gray-200"></div>
              <div className="h-12 w-48 rounded-full bg-gray-200"></div>
            </div>

            {/* Accordion Skeleton */}
            <div className="mt-4 border-t border-gray-100">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-5 border-b border-gray-50"
                >
                  <div className="h-5 w-32 rounded bg-gray-200"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
