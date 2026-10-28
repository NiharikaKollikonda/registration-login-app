
import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem("authToken"))
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const endpoint = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    const payload = isLogin
      ? { email, password }
      : { firstName, lastName, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            Object.values(data).join(" ") ||
            "Something went wrong."
        );
        return;
      }

      if (isLogin) {
        if (!data.token) {
          setMessage("Login succeeded, but no token was returned.");
          return;
        }

        sessionStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
      } else {
        setMessage("Registration successful! You can now sign in.");
        setIsLogin(true);
        setFirstName("");
        setLastName("");
        setPassword("");
      }
    } catch {
      setMessage(
        "Could not connect to the server. Make sure your backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode(loginMode) {
    setIsLogin(loginMode);
    setMessage("");
    setPassword("");
  }

  function handleLogout() {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setIsLogin(true);
    setPassword("");
    setMessage("");
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <main className="page">
      <section className="auth-card">
        <div className="brand-icon">✦</div>

        <p className="eyebrow">YOUR SPACE STARTS HERE</p>

        <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>

        <p className="subtitle">
          {isLogin
            ? "Sign in to continue to your account."
            : "Join us by filling in your details below."}
        </p>

        <div className="tabs">
          <button
            type="button"
            className={isLogin ? "tab active" : "tab"}
            onClick={() => switchMode(true)}
          >
            Sign in
          </button>

          <button
            type="button"
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => switchMode(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="name-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={isLogin ? undefined : 8}
              required
            />
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign in →"
                : "Create account →"}
          </button>
        </form>

        {message && (
          <div className="message" role="status">
            {message}
          </div>
        )}

        <p className="switch-text">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-button"
            onClick={() => switchMode(!isLogin)}
          >
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </p>

        <p className="security-note">
          ♧ &nbsp; Your account is protected
        </p>
      </section>
    </main>
  );
}

export default App;
