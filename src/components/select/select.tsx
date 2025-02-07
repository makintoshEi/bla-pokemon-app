import "./select.css";

type SelectType = string | number;

interface SelectProps<T extends SelectType> {
  onChange: (selectedValue: T) => void;
  options: T[];
  value: T;
}

export default function Select<T extends SelectType>({
  onChange,
  options,
  value,
}: SelectProps<T>) {
  const handleChange = (selectedValue: string) => {
    const convertedValue = (
      typeof value === "number" ? +selectedValue : selectedValue
    ) as T;
    onChange(convertedValue);
  };

  return (
    <select
      className="select-container"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((option: T, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
