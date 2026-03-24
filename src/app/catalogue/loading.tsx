export default function CatalogueLoading() {
  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Header Skeleton */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="h-3 w-32 bg-pink-100/60 rounded-full mx-auto animate-pulse" />
          <div className="h-12 md:h-16 w-80 bg-gray-100 rounded-2xl mx-auto animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-gray-50 rounded-full mx-auto animate-pulse" />
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-100/80 rounded-[1.5rem]" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
                <div className="h-3 w-1/2 bg-gray-50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
