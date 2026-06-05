export function DetailSkeleton() {
  return (
    <div className="custom-container">
      <div className="animate-pulse">
        {/* Backdrop placeholder */}
        <div className="w-full bg-neutral-900 h-150" />

        {/* Stats */}
        <div className="flex gap-8 px-3xl mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-30 rounded-xl bg-neutral-800" />
          ))}
        </div>

        {/* Overview */}
        <div className="mt-12 space-y-3">
          <div className="h-8 w-40 rounded-lg bg-neutral-800" />
          <div className="h-4 w-full rounded bg-neutral-800" />
          <div className="h-4 w-3/4 rounded bg-neutral-800" />
        </div>

        {/* Cast */}
        <div className="mt-12 pb-20">
          <div className="h-8 w-48 rounded-lg bg-neutral-800 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-neutral-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-neutral-800 rounded w-3/4" />
                  <div className="h-3 bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
