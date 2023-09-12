import { Button, Table } from "react-bootstrap";
import "./HistoriquePage.css";
import { NavLink } from "react-router-dom";

const HistoriquePage = () => {
  return (
    <div className="history">
      <div className="d-flex my-5">
        <NavLink to="/home">
          <Button className="me-5">Retour</Button>
        </NavLink>
        <h1>Historique des demandes</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type de demande</th>
            <th>Message</th>
            <th>Etat de la demande</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Demande de données</td>
            <td>Tu peux m’envoyer ton rib ?</td>
            <td>null</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Demande de données</td>
            <td>J’ai plus ton discord, tu peux me l’envoyer?</td>
            <td>null</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Demande de données</td>
            <td>TON DIGICODE STP !!!!!</td>
            <td>null</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Demande d'ajout</td>
            <td>null</td>
            <td>Refuser</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Demande d'ajout</td>
            <td>null</td>
            <td>Accepter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default HistoriquePage;
