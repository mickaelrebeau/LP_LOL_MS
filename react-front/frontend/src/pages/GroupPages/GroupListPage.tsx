import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import "./Group.module.css";
import React, { useEffect, useState } from "react";
import { getGroupByUserId } from "../../services/api/group";
import defaultGroup from "../../assets/defaultGroup.png"
import DatasAdditionnalsAll from "../../components/DatasAdditionnals/DatasAdditionnalsAll";
import { Link, useParams } from "react-router-dom";

export default function GroupListPage() {

    // const groupList = [
    //     {
    //         "_id": "649d8739485db916f138d277",
    //         "user_id": "zhou556",
    //         "name": "Les copains e",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:29:29.245Z",
    //         "updatedAt": "2023-06-29T13:29:29.245Z"
    //     },
    //     {
    //         "_id": "649d8742485db916f138d279",
    //         "user_id": "zhou556",
    //         "name": "Les copains bh",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:29:38.449Z",
    //         "updatedAt": "2023-06-29T13:29:38.449Z"
    //     },
    //      {
    //         "_id": "649d8b5cd7a04df4064ad54d",
    //         "user_id": "zhou556",
    //         "name": "Les copains stupides",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:47:08.776Z",
    //         "updatedAt": "2023-06-29T13:47:08.776Z"
    //     },
    //      {
    //         "_id": "649d8b76d7a04df4064ad54f",
    //         "user_id": "zhou556",
    //         "name": "Les copains de fac",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:47:34.543Z",
    //         "updatedAt": "2023-06-29T13:47:34.543Z"
    //     },
    //     {
    //         "_id": "649d8bb4d7a04df4064ad551",
    //         "user_id": "zhou556",
    //         "name": "Les copains du dessin",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:48:36.687Z",
    //         "updatedAt": "2023-06-29T13:48:36.687Z"
    //     },
    //     {
    //         "_id": "649d8c527d592c8702d1f912",
    //         "user_id": "zhou556",
    //         "name": "Les copains du dojo",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T13:51:14.423Z",
    //         "updatedAt": "2023-06-29T13:51:14.423Z"
    //     },
    //     {
    //         "_id": "649d8e6577dda3cb9673c50f",
    //         "user_id": "zhou556",
    //         "name": "Les copains s",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:00:05.633Z",
    //         "updatedAt": "2023-06-29T14:00:05.633Z"
    //     },
    //      {
    //         "_id": "649d8ec477dda3cb9673c511",
    //         "user_id": "zhou556",
    //         "name": "Les copains lo",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:01:40.616Z",
    //         "updatedAt": "2023-06-29T14:01:40.616Z"
    //     },
    //     {
    //         "_id": "649d8fa70ac4b0c67874b769",
    //         "user_id": "zhou556",
    //         "name": "Les copains aD&D",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:05:27.323Z",
    //         "updatedAt": "2023-06-29T14:05:27.323Z"
    //     },
    //     {
    //         "_id": "649d9166494eb81bb51850ca",
    //         "user_id": "zhou556",
    //         "name": "Les copains de jamais",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:12:54.248Z",
    //         "updatedAt": "2023-06-29T14:12:54.248Z"
    //     },
    //      {
    //         "_id": "649d91db2e3c1f5320de8987",
    //         "user_id": "zhou556",
    //         "name": "Les copains de toujours",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:14:51.615Z",
    //         "updatedAt": "2023-06-29T14:14:51.615Z"
    //     },
    //     {
    //         "_id": "649d92822e3c1f5320de8989",
    //         "user_id": "zhou556",
    //         "name": "la fatrie du feu",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:17:38.447Z",
    //         "updatedAt": "2023-07-03T08:19:26.278Z"
    //     },
    //      {
    //         "_id": "649d97eeab2ee2dcb9037962",
    //         "user_id": "zhou556",
    //         "name": "Les copains k",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:40:46.080Z",
    //         "updatedAt": "2023-06-29T14:40:46.080Z"
    //     },
    //     {
    //         "_id": "649d9892ab2ee2dcb9037964",
    //         "user_id": "zhou556",
    //         "name": "Les copains d'avant",
    //         "is_default": false,
    //         "data_sharing": [
    //             "649d7037e8cd31b9efce8d91",
    //             "649d707de8cd31b9efce8d94"
    //         ],
    //         "group_users": [],
    //         "createdAt": "2023-06-29T14:43:30.573Z",
    //         "updatedAt": "2023-06-29T14:43:30.573Z"
    //     },
    // ]

    //  const id="zhou556";

    //  const {id} = useParams();

    const [groups, setGroups] = useState<any>([]);

    useEffect(() => {
     
      async function loadGroupsByUserId() {
        getGroupByUserId()
        .then((res) => {
            console.log("res",res);
            setGroups(res);
        })
        .catch((err) => {
            console.log(err);
        })
        // console.log(groupList)
        // setGroups(groupList)
      }
  
      loadGroupsByUserId();
    }, [])

    console.log(groups);
    

    return (

        <>
        <Container>
            <div className="m-auto mt-5">
                <h1> Mes groupes </h1>
                
                <br />
                <br />
                    <Link to={`/`}>
                        <Button className="ms-1 me-4 mt-1 shadow">Retour</Button>
                    </Link>
                    <Link to={`/group`}>
                        <Button className="mt-1 shadow" variant="secondary">Ajouter un groupe</Button>
                    </Link>
                    
                <br />
                <br />
                <Row className="g-3">
                <Col md={3} lg={2} gap={3} className="d-flex align-items-stretch" key="group-default">
                    <Card className="shadow etend" >
                    <Card.Body className="d-flex flex-column justify-content-between" >
                        <Card.Title className="text-center mb-5">Défaut  &nbsp; <img src={defaultGroup} id="defaultgroup"/> </Card.Title>

                        <div className="d-flex justify-content-around">
                       
                            <span className="ps-2"><Button href="#" className="shadow m-2" variant="secondary">Voir</Button></span>
                            <span className="pe-2"><Button href="#" className="shadow m-2" variant="danger">Supp</Button></span>
                        </div>
                        
                    </Card.Body>
                    </Card>
                </Col>

                {Array.isArray(groups) && groups.map((group: any, index: any) => (
                       
                    <Col md={3} lg={2} gap={3} className="d-flex align-items-stretch" key={`group-${index}`}>
                    <Card className="shadow etend" >
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="text-center mb-5">{group.name}</Card.Title>
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
                <hr/>
                <br/>
                
                <DatasAdditionnalsAll/>
                <br/>
                
               
            </div>

        </Container>
        <br/>
        <br/>

        </>


    )
}