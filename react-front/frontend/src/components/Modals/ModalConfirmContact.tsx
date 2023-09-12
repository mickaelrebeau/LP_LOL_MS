import "./Modals.scss";
import Modal from "react-bootstrap/Modal";
import { ModalProps } from "../../utils/Interfaces/Modal.interface";

const ModalConfirmContact: React.FC<ModalProps> = ({ showModal, onClose }) => {
  return (
    <Modal show={showModal} onHide={onClose} className="modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Demande de contact envoyée</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Votre demande de contact a bien été envoyée.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Fermer
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmContact;
