import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SkeletonTransaction() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-4 border rounded dark:bg-black p-4 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <Skeleton className="w-full md:w-64 h-4" />
          <Skeleton className="w-full md:w-80 h-4" />
        </div>
        <Separator></Separator>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="grid md:grid-cols-4 w-full gap-4">
            <div className="space-y-2 md:col-span-3 gap-4">
              <Skeleton className="w-full md:w-64 h-4" />
              <Skeleton className="w-full md:w-50 h-3" />
              <Skeleton className="w-full md:w-50 h-3" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Skeleton className="w-full md:w-24 h-4" />
              <Skeleton className="w-full md:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 border rounded dark:bg-black p-4 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <Skeleton className="w-full md:w-64 h-4" />
          <Skeleton className="w-full md:w-80 h-4" />
        </div>
        <Separator></Separator>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="grid md:grid-cols-4 w-full gap-4">
            <div className="space-y-2 md:col-span-3 gap-4">
              <Skeleton className="w-full md:w-64 h-4" />
              <Skeleton className="w-full md:w-50 h-3" />
              <Skeleton className="w-full md:w-50 h-3" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Skeleton className="w-full md:w-24 h-4" />
              <Skeleton className="w-full md:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 border rounded dark:bg-black p-4 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <Skeleton className="w-full md:w-64 h-4" />
          <Skeleton className="w-full md:w-80 h-4" />
        </div>
        <Separator></Separator>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="grid md:grid-cols-4 w-full gap-4">
            <div className="space-y-2 md:col-span-3 gap-4">
              <Skeleton className="w-full md:w-64 h-4" />
              <Skeleton className="w-full md:w-50 h-3" />
              <Skeleton className="w-full md:w-50 h-3" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Skeleton className="w-full md:w-24 h-4" />
              <Skeleton className="w-full md:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 border rounded dark:bg-black p-4 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <Skeleton className="w-full md:w-64 h-4" />
          <Skeleton className="w-full md:w-80 h-4" />
        </div>
        <Separator></Separator>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Skeleton className="w-21 h-21" />
          <div className="grid md:grid-cols-4 w-full gap-4">
            <div className="space-y-2 md:col-span-3 gap-4">
              <Skeleton className="w-full md:w-64 h-4" />
              <Skeleton className="w-full md:w-50 h-3" />
              <Skeleton className="w-full md:w-50 h-3" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Skeleton className="w-full md:w-24 h-4" />
              <Skeleton className="w-full md:w-32 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
