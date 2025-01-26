import "./spinner.css";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function Spinner({
  size = 24,
  color = "#3498db",
  className = "",
}: SpinnerProps) {
  return (
    <div className={`spinner-container ${className}`}>
      <div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
}

export default function CenteredSpinner({
  size = 24,
  color = "#3498db",
  className = "",
}: SpinnerProps) {
  return (
    <div data-testid="spinner" className="centered-spinner-container">
      <Spinner size={size} color={color} className={className} />
    </div>
  );
}
