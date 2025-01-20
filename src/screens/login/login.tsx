import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "hooks/useLocalStorage";
import "./login.css";
import { User } from "interfaces/user";
import Button from "components/button/button";

const usernameInitialValues: User = {
  username: "",
  password: "",
};

export const Login = () => {
  const [user, setUser] = useState<User>(usernameInitialValues);
  const [error, setError] = useState("");
  const [, setIsLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);
  const router = useRouter();

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.username === "admin" && user.password === "admin") {
      setIsLoggedIn(true);
      router.push("/pokedex");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Pokemon App</h1>
        <form onSubmit={handleLogin} className="login__form">
          <div className="login__form-group">
            <label htmlFor="username" className="login__label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={(e) => handleUser(e)}
              className="login__input"
              required
              aria-required="true"
            />
          </div>
          <div className="login__form-group">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => handleUser(e)}
              className="login__input"
              required
              aria-required="true"
            />
          </div>
          {error && (
            <p className="login__error" role="alert">
              {error}
            </p>
          )}
          <div className="login__form-group">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
