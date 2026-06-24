export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-40 rounded-2xl bg-gray-200" />
      <div className="h-64 rounded-2xl bg-gray-200" />
      <div className="h-48 rounded-2xl bg-gray-200" />
    </div>
  );
}
