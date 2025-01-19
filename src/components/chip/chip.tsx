import "./chip.css";

interface ChipProps {
  children: React.ReactNode;
  styles: React.CSSProperties;
}

export const Chip = ({ children, styles }: ChipProps) => {
  return (
    <div className="chip-container" style={styles}>
      {children}
    </div>
  );
};
