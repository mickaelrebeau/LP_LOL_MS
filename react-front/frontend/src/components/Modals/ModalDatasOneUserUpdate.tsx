/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import DatasAdditionnals from '../DatasAdditionnals/DatasAdditionnalsCreate';

export default function UpdateDatasOneUser() {
  // @ts-ignore
  const contact=["John Doe", "Léon Patate", "Superman", "Jane Doe", "Marguerite", "Dicks Grayson"];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     
      <div className="d-flex justify-content-around ">
        <span className="ps-2"><Button href="#" className="shadow m-2" variant="secondary" onClick={handleShow}>Modifier</Button></span>
        <span className="pe-2"><Button href="#" className="shadow m-2" variant="danger">Supp</Button></span>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'accès à la (ou aux) donnée(s) supplémentaires allouées à un de vos contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Nom du contact : Axel Legros
          <Form>
            {/* <DatasAdditionnals /> */}
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
            <div>
            <Button variant="danger" onClick={handleClose} className='ms-1'>
                Supprimer
            </Button>
            </div>
            <div>
            <Button variant="secondary" onClick={handleClose} className='mx-1'>
                Fermer
            </Button>
            <Button variant="primary" onClick={handleClose} className='mx-1'>
                Valider
            </Button>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

