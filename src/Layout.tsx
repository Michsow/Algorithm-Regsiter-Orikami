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
          <Link to="/">algorithms</Link>
          <Link to="/patients">patients</Link>
          <Link to="/results">results</Link>
        </aside>

        {/* Page content */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
