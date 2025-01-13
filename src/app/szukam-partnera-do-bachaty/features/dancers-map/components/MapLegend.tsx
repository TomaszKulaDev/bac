export function MapLegend() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h4 className="font-semibold text-gray-800 mb-3">Liczba tancerzy</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-600" />
          <span className="text-sm text-gray-600">1-10 tancerzy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-600" />
          <span className="text-sm text-gray-600">11-50 tancerzy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600" />
          <span className="text-sm text-gray-600">50+ tancerzy</span>
        </div>
      </div>
    </div>
  );
}
