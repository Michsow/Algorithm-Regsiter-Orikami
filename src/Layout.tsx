import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div className="app">
      {/* Top bar */}
      <header className="topbar">
        <div className="logo">logo</div>
        <button className="login">inloggen</button>
      </header>

      <div className="body">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link to="/">Algorithms</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/results">Results</Link>
        </aside>

        {/* Page content */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
