import "./logout.css";

interface LogoutProps {
  onLogout: () => void;
}

export const Logout = ({ onLogout }: LogoutProps) => {
  return (
    <nav role="navigation" className="nav">
      <div>
        <button className="nav__button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
