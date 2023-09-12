import "./Page404.css";
import nofound from "../../assets/image/nofound.gif";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="nofound">
      <h1 className="m-5">Page non trouvée</h1>
      <div className="container_nofound">
        <img src={nofound} alt="teemo" className="nofound_image" />
        <div className="nofound_text">
          <p className="mb-5">Revenir à la page d'accueil</p>
          <NavLink to="/home">
            <button className="button_retour--nofound">ici</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Page404;
