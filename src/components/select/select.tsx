import "./select.css";

interface SelectProps {
  onChange: (selectedValue: number) => void;
  options: string[] | number[];
  value: number;
}

export default function Select({ onChange, options, value }: SelectProps) {
  return (
    <select
      className="select-container"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
