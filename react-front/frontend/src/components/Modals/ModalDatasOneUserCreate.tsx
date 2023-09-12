import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DataAdditionnalsCreate from './ModalDataAdditionnalCreate';


export default function DatasOneUser() {

    const contact=["John Doe", "Léon Patate", "Superman", "Jane Doe", "Marguerite", "Dicks Grayson"];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [datas, setDatas] = useState<any>([]);


  async function handleAdddataSharing(data: any) {
    
    if (datas.some((obj: { data: any; }) => obj.data === data.data)){
     
      const alertElement = document.getElementById("alertForDataGroup");
      if (alertElement) {
        alertElement.innerHTML = "";
        const divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.setAttribute("role", "alert");
        divAlert.textContent = "Votre contact a déjà cette donnée!";
        alertElement.appendChild(divAlert);
      }
    } else {
      const alertElement = document.getElementById("alertForDataGroup");
      if (alertElement){
        alertElement.innerHTML = "";
      }
      setDatas([...datas, data]);
    }
    
  };

const collectDataSharing = (datas:any[]) => {
  const datasSharing = [];
  for (let data of datas){
    
    let dataSharing = {"data":data.data, "expiration_date":data.expiration_date};
   
    datasSharing.push(dataSharing);
  }
  return datasSharing;
}


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Donner accès à une (ou des) donnée(s) supplémentaires à un de vos contacts
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Donner accès une (ou des) donnée(s) supplémentaires à un de vos contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Select aria-label="contact select">
                <option>Choisir le contact</option>
                {contact.map((item: any, index: any) => (
                    <option value={item.id} key={`default-${index}`}>{item}</option>
              
                ))}
            </Form.Select>
            <br/>
              <span id="alertForDataGroup"></span>
              <strong>Données partagées</strong><br/>
                {datas?.map((item:any, index:any) => (
                    <div key={index}>
                        <p>{item?.name} </p>
                    </div>
                ))}
            <br/>
            <DataAdditionnalsCreate handleAdddataSharing={handleAdddataSharing}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

