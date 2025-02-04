import {
  FaChartLine,
  FaPlay,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaShare,
} from "react-icons/fa";

export const PoplistaHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {/* Lewa strona - Tytuł z przyciskiem play */}
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all shadow-lg group">
            <FaPlay className="text-white text-xl ml-1 group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bachata Top lista 2025
            </h1>
            <p className="text-sm text-gray-500">
              Top 20 • Najpopularniejsze utwory
            </p>
          </div>
        </div>

        {/* Prawa strona - Statystyki i social media */}
        <div className="flex items-center gap-8">
          {/* Licznik głosów */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <FaChartLine className="text-gray-600" />
            <span className="text-gray-700 font-medium">1,234 głosów</span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
              <FaFacebook className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 transition-opacity">
              <FaInstagram className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-90 transition-opacity">
              <FaTiktok className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity">
              <FaTwitter className="text-xl" />
            </button>
          </div>

          {/* Przycisk udostępniania */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <FaShare className="text-gray-600" />
            <span className="text-gray-700 font-medium">Udostępnij</span>
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-gray-600">
          Wybieraj hity, które rozkręcą każdą imprezę! Twój głos ma moc! Nie
          pozwól, żeby ktoś inny decydował o muzyce na Bachatowej imprezie!
        </p>
      </div>
    </div>
  );
};
