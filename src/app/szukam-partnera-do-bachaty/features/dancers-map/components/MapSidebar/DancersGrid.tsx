import { DancerCard } from "./DancerCard";
import { DancerMarker, UserProfile } from "@/types/user";

interface DancerWithLocation {
  id: string;
  name: string;
  image?: string;
  city: string;
  styles: DancerMarker["styles"];
}

interface DancersGridProps {
  dancers: DancerWithLocation[];
}

export function DancersGrid({ dancers }: DancersGridProps) {
  return (
    <div className="overflow-y-auto h-[680px] pr-2">
      <div className="grid grid-cols-3 gap-6 auto-rows-max place-items-center pt-2">
        {dancers.map((dancer) => (
          <DancerCard
            key={dancer.id}
            dancer={dancer}
            city={dancer.city}
            styles={dancer.styles}
          />
        ))}
      </div>
    </div>
  );
}
