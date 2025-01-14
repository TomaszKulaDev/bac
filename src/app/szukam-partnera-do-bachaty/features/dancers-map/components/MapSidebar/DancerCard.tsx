import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { DancerMarker } from "@/types/user";
import Link from "next/link";

interface DancerCardProps {
  dancer: {
    id: string;
    name: string;
    image?: string;
    gender?: string;
    level?: string;
    dancePreferences?: {
      styles: string[];
    };
  };
  city: string;
  styles: DancerMarker["styles"];
}

export function DancerCard({ dancer, city, styles }: DancerCardProps) {
  const formatName = (name: string) => {
    if (!name || name.length < 3) return name;
    const firstName = name.split(" ")[0];
    return `${firstName} ${name.split(" ")[1]?.[0] || ""}`.trim();
  };

  const formattedName = formatName(dancer.name);
  const mainStyle = styles[0]?.name || "Bachata";
  const dancerLevel = dancer.level || "początkujący";
  const profileUrl = `/tancerze/${dancer.id}`;

  return (
    <article
      className="group relative"
      itemScope
      itemType="https://schema.org/Person"
      aria-label={`${formattedName} - ${dancerLevel} tancerz ${mainStyle} z miasta ${city}`}
    >
      <Link
        href={profileUrl}
        className="block focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
        title={`Zobacz profil tancerza: ${formattedName}`}
      >
        <div className="relative">
          <div
            className="w-[106px] h-[106px] rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-amber-300 
                       hover:from-amber-600 hover:to-amber-400 transition-all duration-300 
                       cursor-pointer transform hover:scale-105"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
              <Image
                src={dancer.image || "/images/default-avatar.png"}
                alt={`${formattedName} - ${dancerLevel} tancerz ${mainStyle} w ${city}`}
                width={106}
                height={106}
                className="object-cover w-full h-full"
                itemProp="image"
                priority={true}
                loading="eager"
              />
            </div>
          </div>

          <button
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md 
                     flex items-center justify-center group-hover:scale-110 
                     transition-transform duration-200 hover:bg-rose-50
                     focus:outline-none focus:ring-2 focus:ring-rose-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Logika dodawania do ulubionych
            }}
            aria-label={`Dodaj ${formattedName} do ulubionych`}
            type="button"
          >
            <HeartIcon
              className="w-5 h-5 text-rose-500 hover:fill-rose-500 transition-colors"
              aria-hidden="true"
            />
          </button>

          <div
            className="absolute -top-1 -right-1 px-2 py-0.5 bg-amber-500 text-white 
                     text-xs rounded-full shadow-sm"
            itemProp="location"
          >
            <span itemProp="addressLocality">{city}</span>
          </div>
        </div>

        <div className="mt-2 text-center">
          <h3 className="text-sm font-medium text-gray-800" itemProp="name">
            {formattedName}
          </h3>
          <div
            className="flex flex-col items-center gap-0.5"
            itemProp="hasOccupation"
            itemScope
            itemType="https://schema.org/Occupation"
          >
            <span itemProp="name" className="text-xs text-gray-500">
              {mainStyle}
            </span>
            {dancer.level && (
              <span itemProp="qualifications" className="text-xs text-gray-400">
                {dancerLevel}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Schema.org metadata */}
      <meta itemProp="gender" content={dancer.gender || "unspecified"} />
      <meta
        itemProp="url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${profileUrl}`}
      />

      {/* Dodatkowe metadane dla wyszukiwarek */}
      <meta
        name="description"
        content={`${formattedName} - ${dancerLevel} tancerz ${mainStyle} w ${city}. 
                 Dostępne style: ${styles.map((s) => s.name).join(", ")}`}
      />
      <meta
        name="keywords"
        content={`taniec,${mainStyle},${city},partner do tańca,${dancerLevel}`}
      />

      {/* Dane strukturalne dla każdego stylu tańca */}
      <div itemScope itemType="https://schema.org/Thing">
        {styles.map((style) => (
          <meta
            key={style.name}
            itemProp="knowsAbout"
            content={`${style.name} ${dancer.level || ""}`}
          />
        ))}
      </div>

      {/* Social media metadata */}
      <meta
        property="og:title"
        content={`${formattedName} - Tancerz ${mainStyle}`}
      />
      <meta property="og:type" content="profile" />
      <meta
        property="og:image"
        content={dancer.image || "/images/default-avatar.png"}
      />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${profileUrl}`}
      />
      <meta
        property="og:description"
        content={`${dancerLevel} tancerz ${mainStyle} w ${city}`}
      />
    </article>
  );
}
