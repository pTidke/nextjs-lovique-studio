export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header Skeleton */}
      <section className="pt-32 md:pt-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-3 w-24 bg-pink-100/60 rounded-full mx-auto animate-pulse" />
          <div className="h-12 md:h-16 w-64 bg-gray-100 rounded-2xl mx-auto animate-pulse" />
          <div className="h-4 w-80 max-w-full bg-gray-50 rounded-full mx-auto animate-pulse" />
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
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
