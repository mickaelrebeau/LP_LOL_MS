import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getDataById, putUpdateDataAdd } from '../../services/api/data';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

export default function DataAdditionnalUpdate() {

    // const {id} = useParams();
    const id = "64bfce5dbf695c97033fc8b9";
    console.log("coucou!_id", id)
    const [dataSharing, setDataSharing]:any = useState([]);
   console.log("datasSharing!!",dataSharing)

    const [dataS, setDataS]:any = useState(
        {
            id: "",
            expiration_date: ""
        }
    )
    console.log("Boum", dataS)

    useEffect( () => {
        async function loadDataSharing(id: string | undefined){
            const dataSharingData = [];
            
                console.log("coucou_id", id)
                //id est l'id d'un data_sharing
                let data:any = await putUpdateDataAdd(id);
                //data : récupération du contenu de l'objet data_sharing
                data.expiration_date = formatDate(data.expiration_date, "-");
                console.log("hello_data", data)
                setDataS(data)
                let decriptedData:any = await getDataById(data.data);
                // data.data récupère l'id de la donnée du data_sharing
                // decriptedData récupère le contenu de la donnée
                dataSharingData.push({"decriptedData":decriptedData, "data":data})
                console.log("datasSharingData", dataSharingData)
                //datasSharingData : tableau avec les objets data dans leur ensemble, pas seulement les id
            
            setDataSharing(dataSharingData)
        }
            loadDataSharing(id);
    }, [id])

    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
      }

    function formatDate(date: Date, separator: string) {
        const newFormat = new Date(date);
        const month = padTo2Digits(newFormat.getMonth() + 1);
        const day = padTo2Digits(newFormat.getDate());
        const year = newFormat.getFullYear();
        return year+separator+month+separator+day;
      }

      function formaterDate(date: string | Date) {
        const newFormat = new Date(date);
        const month = newFormat.getMonth() + 1;
        const day = newFormat.getDate();
        const year = newFormat.getFullYear();

        // return `${day}/${month}/${year}`;
        return day + "/" + month + "/" + year;
      }
   

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
          <Modal.Title>Modifier la donnée du groupe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           
          <Form>
                <Row className="survol py-1">
                    <Col sm={4}>
                        
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value={dataSharing.decriptedData.name} id={id} defaultChecked={true}
                            // onChange={handleDataS} ></input>
                            onChange={() => setDataS({...dataS, 'id': dataSharing.data.data})}></input>
                            <label className="form-check-label" htmlFor={id}>
                                {dataSharing.decriptedData.name}
                            </label>
                        </div>
                    </Col>
                    <Col sm={8}>
                    
                        <Row>
                            <Col sm={4}>
                            <p className="text-end"> Date d'expiration </p>
                            </Col>
                            <Col sm={8}>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id={`expdate_data-${id}`} 
                                    placeholder={dataSharing.data.expiration_date} value={dataS.expiration_date}
                                    onChange={(e) => setDataS({...dataS, 'expiration_date': e.target.value})}
                                    /* onChange={() => handleDataS(item.data.expiration_date)} */
                                    name={dataSharing.data.data.id} ></input>
                                    <label htmlFor="floatingInput">{dataSharing.data?.expiration_date?formaterDate(dataSharing.data.expiration_date):"Pas de date d'expiration"}</label>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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