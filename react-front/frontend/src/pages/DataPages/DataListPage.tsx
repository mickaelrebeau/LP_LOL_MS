import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import "./Data.module.css";
import React, { useEffect, useState } from "react";
import { getDataByUserId } from "../../services/api/data";
import { useParams } from "react-router-dom";

export default function DataListPage() {

//    const id = "zhou556";

     const {id} = useParams();

    const [datasUser, setDatasUser] = useState([]);

    useEffect(() => {
     
      async function loadDatasByUserId2(id: any) {
        const dataList = await getDataByUserId(id);
        console.log(dataList)
        setDatasUser(dataList)
      }
  
      loadDatasByUserId2(id);
    }, [])

    console.log(datasUser);
    

    return (

        <>
        <Container>
            <div className="m-auto mt-5">
                <h1> Mes données </h1>
                
                <br />
                <br />
                    <Button className="ms-1 me-4 mt-1 shadow">Retour</Button>
                    <Button className="mt-1 shadow" variant="secondary">Ajouter une donnée</Button>
                <br />
                <br />
                <Row className="g-3">
                

                {datasUser.map((data: any, index: any) => (
                       
                    <Col md={3} lg={2} gap={3} className="d-flex align-items-stretch" key={`data-${index}`}>
                    <Card className="shadow etend" >
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="text-center mb-5">{data.name}</Card.Title>
                        <div className="d-flex justify-content-around ">
                            <span className="ps-2"><Button href="#" className="shadow m-2" variant="secondary">Voir</Button></span>
                            <span className="pe-2"><Button href="#" className="shadow m-2" variant="danger">Supp</Button></span>
                        </div>
                        
                    </Card.Body>
                    </Card>
                    </Col>               
                ))}
                </Row>    
                <br/>
              
                <br/>
                
            </div>

        </Container>
        <br/>
        <br/>

        </>


    )
}