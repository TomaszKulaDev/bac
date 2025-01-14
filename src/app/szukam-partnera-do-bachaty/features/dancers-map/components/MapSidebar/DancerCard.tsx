import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Dancer } from "./types";

interface DancerCardProps {
  dancer: Dancer;
}

export function DancerCard({ dancer }: DancerCardProps) {
  return (
    <div className="group">
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-amber-300 
                      hover:from-amber-600 hover:to-amber-400 transition-all duration-300 
                      cursor-pointer transform hover:scale-105"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
            <Image
              src="/images/bachata-romance.jpg"
              alt="Para tańcząca bachatę"
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
          {dancer.city}
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-gray-800">Jan K.</p>
        <p className="text-xs text-gray-500">
          {dancer.styles[0]?.name || "Bachata"}
        </p>
      </div>
    </div>
  );
}
