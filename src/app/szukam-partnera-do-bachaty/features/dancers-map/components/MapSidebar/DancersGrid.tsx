import { DancerCard } from "./DancerCard";
import { DancerMarker, UserProfile } from "@/types/user";

interface DancerWithLocation {
  id: string;
  name: string;
  image?: string;
  gender?: string;
  level?: string;
  dancePreferences?: {
    styles: string[];
  };
  city: string;
  styles: DancerMarker["styles"];
}

interface DancersGridProps {
  dancers: DancerWithLocation[];
}

export function DancersGrid({ dancers }: DancersGridProps) {
  return (
    <section
      className="overflow-y-auto h-[680px] pr-2"
      aria-label="Lista tancerzy"
    >
      <div
        className="grid grid-cols-3 gap-6 auto-rows-max place-items-center pt-2"
        role="list"
      >
        {dancers.map((dancer) => (
          <div key={dancer.id} role="listitem">
            <DancerCard
              dancer={dancer}
              city={dancer.city}
              styles={dancer.styles}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
