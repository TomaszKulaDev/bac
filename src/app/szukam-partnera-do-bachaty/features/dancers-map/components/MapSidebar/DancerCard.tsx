import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { DancerMarker, UserProfile } from "@/types/user";

interface DancerCardProps {
  dancer: Pick<UserProfile, "id" | "name" | "image">;
  city: string;
  styles: DancerMarker["styles"];
}

export function DancerCard({ dancer, city, styles }: DancerCardProps) {
  // Funkcja do formatowania imienia
  const formatName = (name: string) => {
    if (!name || name.length < 3) return name;
    const firstName = name.split(" ")[0];
    return `${firstName} ${name.split(" ")[1]?.[0] || ""}`.trim();
  };

  return (
    <div className="group relative">
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-amber-300 
                      hover:from-amber-600 hover:to-amber-400 transition-all duration-300 
                      cursor-pointer transform hover:scale-105"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
            <Image
              src={dancer.image || "/images/default-avatar.png"}
              alt={dancer.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <button
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md 
                   flex items-center justify-center group-hover:scale-110 
                   transition-transform duration-200 hover:bg-rose-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <HeartIcon className="w-5 h-5 text-rose-500 hover:fill-rose-500 transition-colors" />
        </button>

        <div
          className="absolute -top-1 -right-1 px-2 py-0.5 bg-amber-500 text-white 
                       text-xs rounded-full shadow-sm"
        >
          {city}
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-gray-800">
          {formatName(dancer.name)}
        </p>
        <p className="text-xs text-gray-500">{styles[0]?.name || "Bachata"}</p>
      </div>
    </div>
  );
}
