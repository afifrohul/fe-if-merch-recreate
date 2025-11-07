import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProduct() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
      <Skeleton className="w-full h-80" />
    </div>
  );
}
