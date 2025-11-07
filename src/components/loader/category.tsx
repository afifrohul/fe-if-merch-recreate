import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCategory() {
  return (
    <div className="space-y-5 mt-4">
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
    </div>
  );
}
