import { Link } from "react-router-dom";
import "../css/Navbar.css";

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbars-link">CineFlow</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/favorites" className="nav-link">Избранное</Link>
      </div>
    </nav>
  )
}