import React, { useEffect, useState } from "react";
// import "./DatasAdditionnals.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
// import { useParams } from "react-router-dom";
import { createDataSharing, getDataByUserId } from "../../services/api/data";

export default function DataAdditionnalsCreate (props:any){
    const id = "zhou556";

    const {handleAdddataSharing} = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function padTo2Digits(num: number) {
    //     return num.toString().padStart(2, '0');
    //   }

    // function formatDate(date: Date, separator: string) {
    //     const newFormat = new Date(date);
    //     const month = padTo2Digits(newFormat.getMonth() + 1);
    //     const day = padTo2Digits(newFormat.getDate());
    //     const year = newFormat.getFullYear();
    //     return year+separator+month+separator+day;
    //   }

//Récupération des datas de l'utilisateur (ci-dessous nommées data)
    const [data, setData] = useState([]);

    useEffect( () => {
        async function loadDatasByUserId(id:any){
            const datas:any = await getDataByUserId(id);
            setData(datas)
        }
        loadDatasByUserId(id);
    }, [])

    const [dataSharing, setDataSharing]:any = useState({
        data:'',
        expiration_date:""
    });

    function handleChange(evt:any){
        const {name, value}:any = evt.target;
        console.log("ipk",name, value)
        setDataSharing({...dataSharing, [name]: value});
    }

    async function handleSubmit(evt:any) {
        evt.preventDefault();
        await createDataSharing(dataSharing);
      
        let  filterData:any = data.filter((data:any) => data._id === dataSharing.data)
        
        dataSharing.name = filterData[0].name;
        handleAdddataSharing(dataSharing);
        handleClose();
      }

    // function handleChangeExpiration(evt: any, index: number) {
    //     const { value }: any = evt.target;
    //     const copyDataSharing:any = [...datasSharing];
    //     copyDataSharing[index].expiration_date = formatDate(value, '-');
    //     setDatasSharing(copyDataSharing)
        
    //   }

     


    return (
        <>
        <Button variant="secondary" onClick={handleShow}>
            Ajouter une donnée
        </Button>
  
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une donnée</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Row className="">
                  <Col>
                    <Form.Select aria-label="data select" name="data" onChange={(evt) => handleChange(evt)}>
                        <option>Vos données</option>
                        {data.map((item: any, index: any) => (
                           
                           <option value={item._id}  key={`default-${index}`}>{item.name}</option>
                        
                        ))}
                    </Form.Select>
                  </Col>
              </Row>
              <br/>
                <Form.Group as={Row} controlId={'expdate_data'}>
                    <Form.Label column sm="3" >Date d'expiration</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="date"
                            name="expiration_date"
                            placeholder="date d'expiration"
                            onChange={(evt) => handleChange(evt)}

                        />
                    </Col>
                </Form.Group>
             
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={ (evt) => handleSubmit(evt)}>
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
      </>
       
          
        
    )
}