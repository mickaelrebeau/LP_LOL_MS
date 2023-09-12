import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Modals.scss";
import { ModalProps } from "../../utils/Interfaces/Modal.interface";



const ModalRequestData: React.FC<ModalProps> = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState<{ describe: string }>({
    describe: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(formData);
    setFormData((prevState) => ({ ...prevState, describe: "" }));
    onClose();
  };

  return showModal ? (
    <Modal show={true} onHide={onClose} className="modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Demande d'une donnée temporaire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <Form.Label>Description de la demande</Form.Label>
            <Form.Control
              as="textarea"
              name="describe"
              value={formData.describe}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <Button type="submit">Envoyer</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  ) : null;
};

export default ModalRequestData;
