import "./modal.css";

interface ModalProps {
  bgColor: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({
  bgColor,
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.type === "keydown") {
      const keyboardEvt = e as React.KeyboardEvent<HTMLDivElement>;
      if (keyboardEvt.key === "Escape") {
        onClose();
      }
      return;
    }

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const styles = {
    "--bg-color": bgColor,
  } as React.CSSProperties;

  return (
    <div
      style={styles}
      className="modal"
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayClick}
      role="button"
      tabIndex={0}
    >
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal__header">
          <h2>{title}</h2>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
