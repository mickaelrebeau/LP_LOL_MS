import "./Modals.scss";
import Modal from "react-bootstrap/Modal";
import { ModalProps } from "../../utils/Interfaces/Modal.interface";

const ModalConfirmAddContact: React.FC<ModalProps> = ({ showModal, onClose }) => {
  return  showModal ? (
      <Modal show={showModal} onHide={onClose} className="modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Demande de contact accepté</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>La demande de contact a bien été acceptée.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Fermer
        </button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default ModalConfirmAddContact;