import { DancerCard } from "./DancerCard";
import { DancerMarker } from "@/types/user";

interface DancersGridProps {
  dancers: DancerMarker[];
}

export function DancersGrid({ dancers }: DancersGridProps) {
  return (
    <div className="overflow-y-auto h-[680px] pr-2">
      <div className="grid grid-cols-3 gap-6 auto-rows-max place-items-center pt-2">
        {dancers.map((dancer, index) => (
          <DancerCard key={index} dancer={dancer} />
        ))}
      </div>
    </div>
  );
}
