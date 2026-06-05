export default function SearchSkeleton() {
  return (
    // Skeleton when loading
    <div className="flex flex-col">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <div className="flex gap-6 py-8 animate-pulse">
            <div
              className="shrink-0 bg-neutral-800 rounded-xl"
              style={{ width: '140px', height: '200px' }}
            />
            <div className="flex flex-col gap-3 flex-1">
              <div className="h-6 bg-neutral-800 rounded w-2/3" />
              <div className="h-4 bg-neutral-800 rounded w-1/4" />
              <div className="h-4 bg-neutral-800 rounded w-full" />
              <div className="h-4 bg-neutral-800 rounded w-3/4" />
              <div className="h-10 bg-neutral-800 rounded-full w-40 mt-2" />
            </div>
          </div>
          <div className="w-full h-px bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
