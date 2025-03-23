import { Skeleton } from "@/components/ui/skeleton";

function CardTorneoSkeleton() {
  return (
    <article className="rounded-2xl max-w-3xl overflow-hidden shadow-lg" >
      <div className="relative">
        <Skeleton className="w-full h-[180px] md:h-[250px] object-cover" />
        <div className="absolute right-2 bottom-2 p-1 rounded-full">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5 p-3 md:p-5 bg-[#2B0C52]">
        <div className="px-3 py-2 rounded-2xl md:rounded-3xl">
          <div className="flex flex-col text-center items-center">
            <Skeleton className="w-12 h-16" />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32 rounded-2xl" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default CardTorneoSkeleton;
