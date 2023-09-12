import { NavLink } from "react-router-dom";
import "./ScanPage.css";

const ScanPage = () => {
  return (
    <div className="container d-flex flex-column align-items-center p-3 mt-5 mb-5 scan_container">
      <div className="w-100 mb-4 ">
        <div className="scan_title">
          <NavLink to="/home">
            <button className="button_retour">Retour</button>
          </NavLink>
          <h1>Ajout rapide</h1>
        </div>
      </div>
      <p>Scanner ce QR-Code afin d’ajouter rapidement un contact</p>
      <div className=" scan_qr w-100 d-flex justify-content-center align-items-center">
        <img src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2Flocalhost%3A8085%2Fhome&chs=180x180&choe=UTF-8&chld=L|2" alt="qr-code"></img>
      </div>
    </div>
  );
};

export default ScanPage;
