import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer_list">
        <ul className="list_items">
          <li><NavLink to="/" />Aides | </li>
          <li><NavLink to="/" />Termes |</li>
          <li><NavLink to="/" />Politique de confidentialités</li>
        </ul>
        <span className="list_text">LP-LOL © 2023</span>
      </div>
      <div>
        <h1 className="footer_title">LP-LOL</h1>
      </div>
    </footer>
  );
}

export default Footer;
