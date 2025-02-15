import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-9 w-[100px]" />
      <Skeleton className="h-[208px] w-[208px] rounded-xl" />
    </div>
  );
}
