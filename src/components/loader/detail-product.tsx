import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDetailProduct() {
  return (
    <div className="grid lg:grid-cols-2 gap-4 p-2">
      <Skeleton className="w-full h-[600px]" />
      <Skeleton className="w-full h-[600px]" />
    </div>
  );
}
