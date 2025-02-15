import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </div>
  );
}
