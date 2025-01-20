import "./message.css";

type MessageVariant = "info" | "error";

interface MessageProps {
  message: string;
  variant?: MessageVariant;
}

export const Message = ({ message, variant = "info" }: MessageProps) => {
  return (
    <div className={`message ${variant}`}>
      <span className="message__icon">{variant === "error" ? "⚠️" : "ℹ️"}</span>
      <p className="message__text">{message}</p>
    </div>
  );
};
