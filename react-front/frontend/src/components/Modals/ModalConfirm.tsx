import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './Modals.scss';
import { ModalProps } from "../../utils/Interfaces/Modal.interface";

function ModalConfirm(props: ModalProps) {
  const {showModal, onClose} = props;

  return (
    <>
      <Modal show={showModal} onHide={onClose}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Mot de passe oublié !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='text-center'>Merci !</p>
            <p>
                Vous avez reçu un email avec les 
                instructions de réinitialisations 
                de mot de passe.
                Si vous ne voyez pas le mail,
                vérifiez vos spam.
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='modal-send p-3' variant="cancel" onClick={onClose}>
            Retour à la page de connexion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;