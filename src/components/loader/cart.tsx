import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCart() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 border rounded dark:bg-black p-4 ">
        <Skeleton className="w-4 h-4" />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div className="space-y-2">
              <Skeleton className="w-32 lg:w-64 h-4" />
              <Skeleton className="w-24 lg:w-50 h-3" />
            </div>
            <div className="flex flex-citems-end gap-3">
              <Skeleton className="w-12 lg:w-24 h-4" />
              <Skeleton className="w-16 lg:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4 border rounded dark:bg-black p-4 ">
        <Skeleton className="w-4 h-4" />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div className="space-y-2">
              <Skeleton className="w-32 lg:w-64 h-4" />
              <Skeleton className="w-24 lg:w-50 h-3" />
            </div>
            <div className="flex flex-citems-end gap-3">
              <Skeleton className="w-12 lg:w-24 h-4" />
              <Skeleton className="w-16 lg:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4 border rounded dark:bg-black p-4 ">
        <Skeleton className="w-4 h-4" />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div className="space-y-2">
              <Skeleton className="w-32 lg:w-64 h-4" />
              <Skeleton className="w-24 lg:w-50 h-3" />
            </div>
            <div className="flex flex-citems-end gap-3">
              <Skeleton className="w-12 lg:w-24 h-4" />
              <Skeleton className="w-16 lg:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
