import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>HRMS Lite</h2>
      <div>
        <Link to="/">Employees</Link>
      </div>
    </nav>
  );
}
