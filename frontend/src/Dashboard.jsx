
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("Your session has expired. Please sign in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          sessionStorage.removeItem("authToken");
          setError("Your session has expired. Please sign in again.");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch {
        setError("Unable to connect to the server. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return <main className="dashboard-page">Loading your dashboard...</main>;
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-card">
          <h1>Session unavailable</h1>
          <p>{error}</p>
          <button className="dashboard-button" onClick={onLogout}>
            Return to sign in
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <div className="dashboard-icon">✦</div>
        <p className="dashboard-eyebrow">YOUR PERSONAL SPACE</p>
        <h1>You're signed in!</h1>
        <p className="dashboard-subtitle">
          Your token was accepted by the protected backend endpoint.
        </p>

        <div className="account-details">
          <span>Account email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="success-message">
          ✓ &nbsp; Your account is authenticated
        </div>

        <button className="dashboard-button" onClick={onLogout}>
          Sign out
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
