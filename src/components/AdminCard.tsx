import Link from "next/link";

interface AdminCardProps {
  title: string;
  link: string;
  bgColor: string;
  textColor: string;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  link,
  bgColor,
  textColor,
}) => {
  return (
    <Link href={link}>
      <div
        className={`${bgColor} ${textColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300`}
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm opacity-80">Kliknij, aby zarządzać</p>
      </div>
    </Link>
  );
};

export default AdminCard;
