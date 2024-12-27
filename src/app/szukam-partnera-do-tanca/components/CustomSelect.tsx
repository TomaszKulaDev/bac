import { IconType } from "react-icons";

interface CustomSelectProps {
  type: string;
  label: string;
  icon: IconType;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (value: string) => void;
}

export function CustomSelect({
  type,
  label,
  icon: Icon,
  options,
  placeholder,
  onChange,
}: CustomSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="input-icon" />
        <select
          className="select-custom"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
