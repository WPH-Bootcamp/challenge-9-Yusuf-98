export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse shrink-0">
      <div className="bg-neutral-800 rounded-lg" style={{ aspectRatio: '2/3' }} />
      <div className="mt-2 space-y-1.5">
        <div className="h-3.5 bg-neutral-800 rounded-md w-full" />
        <div className="h-3 bg-neutral-800 rounded-md w-1/2" />
      </div>
    </div>
  );
}
