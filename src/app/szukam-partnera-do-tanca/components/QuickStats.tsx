import {
  FaUsers,
  FaHandshake,
  FaMapMarkedAlt,
  FaGraduationCap,
} from "react-icons/fa";

export function QuickStats() {
  const stats = [
    {
      label: "Aktywnych Tancerzy",
      value: "2,500+",
      icon: FaUsers,
      color: "from-red-400 to-red-600",
    },
    {
      label: "Udanych Połączeń",
      value: "1,200+",
      icon: FaHandshake,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Miast w Polsce",
      value: "48",
      icon: FaMapMarkedAlt,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Szkół Partnerskich",
      value: "120+",
      icon: FaGraduationCap,
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br text-white transform transition-transform group-hover:scale-110">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
