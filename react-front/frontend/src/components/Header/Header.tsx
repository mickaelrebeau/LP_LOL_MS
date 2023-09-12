import "./Header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShowMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(!isMenuOpen);
    localStorage.clear();
  }

  const token = localStorage.getItem('token');
  
  //a changer pour mettre en privee !!!
  const auth = { token: token? true : false };
  //const auth = { token: true}
  
  return (
    <header>
      <nav className={`header ${isMenuOpen ? 'show-nav' : 'hide-nav'}`}>
        <img className="header_img" src={Logo} alt="logo de lp-lol" />
        <h1 className="header_title">LP-LOL</h1>
        {auth.token && (
        <><button
            className="header_burger"
            type="button"
            onClick={handleShowMenu}
          >
            <span className="burger_bar"> </span>
          </button><ul className="header_navlink">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profil"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Mon Profil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/scan"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Mon scan d’invitation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/group/all"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Mes Groupes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/request"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Mes demandes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/historique"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleShowMenu}
                >
                  Historique des demandes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) => isActive ? "navlink_item--active" : "navlink_item"}
                  onClick={handleLogout}
                >
                  Déconnexion
                </NavLink>
              </li>
            </ul></>
        )}
      </nav>
    </header>
  );
}

export default Header;
