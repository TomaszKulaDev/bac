interface DancerCardProps {
  dancer: {
    city: string;
    styles: Array<{
      name: string;
      count: number;
    }>;
  };
}

export function DancerCard({ dancer }: DancerCardProps) {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-medium text-gray-900">{dancer.city}</h3>
      <div className="mt-2 space-y-1">
        {dancer.styles.map((style) => (
          <div key={style.name} className="text-sm text-gray-600">
            {style.name}
          </div>
        ))}
      </div>
    </div>
  );
}
