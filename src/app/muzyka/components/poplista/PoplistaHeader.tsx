import { FaChartLine, FaPlay } from "react-icons/fa";

export const PoplistaHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-8 mb-4">
        {/* Tytuł z przyciskiem play */}
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all shadow-lg group">
            <FaPlay className="text-white text-xl ml-1 group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bachata Poplista
            </h1>
            <p className="text-sm text-gray-500">
              Top 20 • Najpopularniejsze utwory
            </p>
          </div>
        </div>

        {/* Licznik głosów */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <FaChartLine className="text-gray-600" />
          <span className="text-gray-700 font-medium">1,234 głosów</span>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-gray-600">
          Wybieraj hity, które rozkręcą każdą imprezę! Twój głos ma moc! Nie
          pozwól, żeby ktoś inny decydował o muzyce na imprezie!
        </p>
      </div>
    </div>
  );
};
