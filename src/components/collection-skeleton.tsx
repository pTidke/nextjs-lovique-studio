// Loading state matching CollectionView: compact header, chips, 2-up / 3-up grid
export default function CollectionSkeleton() {
  return (
    <main className="min-h-screen bg-white pb-28" aria-busy="true" aria-label="Loading collection">
      <div className="px-6 pb-8 pt-28 md:pb-12 md:pt-36">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <div className="mx-auto h-10 w-56 animate-pulse rounded-2xl bg-blush-deep md:h-14 md:w-80" />
          <div className="mx-auto h-4 w-72 max-w-full animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl justify-center gap-2 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-11 w-24 shrink-0 animate-pulse rounded-full bg-gray-100" />
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-4 md:gap-x-8 md:px-6 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] rounded-2xl bg-blush-deep" />
            <div className="space-y-2 px-1 pt-4">
              <div className="h-5 w-3/4 rounded-lg bg-gray-100" />
              <div className="h-4 w-1/3 rounded-lg bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
