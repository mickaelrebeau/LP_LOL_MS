/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import "./DatasAdditionnals.css";
import UpdateDatasOneUser from "../Modals/ModalDatasOneUserUpdate";
import { Card, Col, Row } from "react-bootstrap";
import DatasOneUser from "../Modals/ModalDatasOneUserCreate";
import { useParams } from "react-router-dom";
import { getOneByUserId } from "../../services/api/group";
// import { format } from 'date-fns';


export default function DatasAdditionnalsAll() {

    // const datasAddList = [{"name": "Toto", "datas":["Adresse", "Tel"]},{"name":"Bidule", "datas": ["Adresse"]}];

    const {id} = useParams();

    const [datasAddList, setDatasAddList] = useState([]);

    useEffect(() => {
        async function loadOnesByUserId(id: any){
            const onesList = await getOneByUserId(id);
            console.log(onesList)
            // @ts-ignore
            setDatasAddList(onesList)
        }
        loadOnesByUserId(id);
    }, [id])

    console.log("datasAddList",datasAddList)

    return (
        <>
        <h2> Mes données partagées avec un contact</h2>

        <br/>
        <DatasOneUser/>
        <br/>
        <br/>
    
        <Row>
            <>
                {datasAddList.map((item: any, index: any) => (
                    <Col md={6} lg={4} gap={3} className="d-flex align-items-stretch" key={`dataAdd-${index}`}>
                        <Card className="shadow etend my-1" >
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title className="text-center mb-5"> Avec {item.contact_id}</Card.Title>
                                <Card.Text>
                                    <strong>
                                        Données partagées :
                                    </strong>
                                </Card.Text>
                                    <ul>
                                        {
                                            item.dataname.map((value:any, i:any) => (
                                                <li key={i}>{value}</li>
                                            ))
                                        }
                                    </ul>
                                <Card.Text>
                                   {/* <span className="ps-4"> Jusqu'au: {format(new Date(item.expiration), 'dd/MM/yyyy')}</span> */}
                                </Card.Text>
                                <UpdateDatasOneUser />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </>
        </Row>
        </>
    )
}