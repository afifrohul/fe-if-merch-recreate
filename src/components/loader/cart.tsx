import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCart() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-4 h-4" />
        <div className="flex gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex justify-between w-full">
            <div className="space-y-2">
              <Skeleton className="w-64 h-4" />
              <Skeleton className="w-50 h-3" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Skeleton className="w-4 h-4" />
        <div className="flex gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex justify-between w-full">
            <div className="space-y-2">
              <Skeleton className="w-64 h-4" />
              <Skeleton className="w-50 h-3" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Skeleton className="w-4 h-4" />
        <div className="flex gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex justify-between w-full">
            <div className="space-y-2">
              <Skeleton className="w-64 h-4" />
              <Skeleton className="w-50 h-3" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
