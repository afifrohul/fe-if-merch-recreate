import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonFAQ() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full h-6 mt-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
    </div>
  );
}
