import "./button.css";

interface ButtonProps {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  classname?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "secondary";
}

const Button = ({
  children,
  classname,
  onClick,
  type,
  variant = "default",
}: ButtonProps) => (
  <button
    type={type}
    className={`button-container button-container__${variant} ${classname}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
