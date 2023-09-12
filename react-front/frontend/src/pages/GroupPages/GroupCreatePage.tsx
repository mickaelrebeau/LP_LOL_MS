/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form, FormGroup, Row } from "react-bootstrap";
import "./Group.module.css";
import { useState } from "react";
import React from "react";
import DataAdditionnalsCreate from "../../components/Modals/ModalDataAdditionnalCreate.tsx";
import { createGroup } from "../../services/api/group.ts";
import { Link } from "react-router-dom";


export default function GroupCreatePage() {

  const id="zhou556"
  const contact=["John Doe", "Léon Patate", "Superman", "Jane Doe", "Marguerite", "Dicks Grayson"];

  const [datas, setDatas] = useState<any>([]);


  async function handleAdddataSharing(data: any) {
    
    if (datas.some((obj: { data: any; }) => obj.data === data.data)){
     
      const alertElement = document.getElementById("alertForDataGroup");
      if (alertElement) {
        alertElement.innerHTML = "";
        const divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.setAttribute("role", "alert");
        divAlert.textContent = "Le groupe a déjà cette donnée!";
        alertElement.appendChild(divAlert);
      }
    } else {
      const alertElement = document.getElementById("alertForDataGroup");
      if (alertElement){
        alertElement.innerHTML = "";
      }
      setDatas([...datas, data]);
    }
    
  }

const collectDataSharing = (datas:any[]) => {
  const datasSharing = [];
  for (const data of datas){
    
    const dataSharing = {"data":data.data, "expiration_date":data.expiration_date};
   
    datasSharing.push(dataSharing);
  }
  return datasSharing;
}

  const [checkedContact, setCheckedContact] = useState<string[]>([]);
  console.log("contacts", checkedContact)

  const [group, setGroup] = useState({
    user_id:id,
    name:"",
    is_default: false,
    expiration_date:"",
    data_sharing:[],
    group_users: [],

  })
   

      async function handleSubmit(evt:any) {
        evt.preventDefault();
        // @ts-ignore
       group.group_users = checkedContact;
       // @ts-ignore
       group.data_sharing = collectDataSharing(datas);
        console.log("group?", group)
        await createGroup(group);
        //message pour prévenir de la création du groupe
        const alertElement = document.getElementById("groupIsCreate");
          if (alertElement) {
            alertElement.innerHTML = "";
            const divAlert = document.createElement("div");
            divAlert.setAttribute("class", "alert alert-success");
            divAlert.setAttribute("role", "alert");
            divAlert.textContent = "Le groupe a bien été créé!";
            alertElement.appendChild(divAlert);
          }
      }
    
      function handleChange(evt:any) {
        const { name, value }:any = evt.target;
        setGroup({...group, [name]: value});
      }


     

  // Fonction pour mettre à jour l'état en fonction des checkboxes cochées
  const handleChangeContact = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (evt.target.checked) {
      // Ajouter la valeur à l'état si elle est cochée
      setCheckedContact((prevValues) => [...prevValues, value]);
    } else {
      // Retirer la valeur de l'état si elle est décochée
      setCheckedContact((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };



    return (
        <>
            
            

            <Container>
                <div className="m-auto col-lg-8 mt-5">
                  <span id="groupIsCreate"></span>
                  <Link to={`/group/all/${id}`}>
                    <Button className='shadow' variant="secondary">Retour</Button>
                  </Link>
                
                <h1> Créer un nouveau groupe </h1>

                <br />
                <br />

                <Form onSubmit= {(evt) => handleSubmit(evt)}>
                    
                    <Form.Control type="text" placeholder="Nom du groupe" name="name" onChange={(evt) => handleChange(evt)}/>
                    <br/>
                    <Form.Group controlId="expiration_date">
                    <Form.Label>Date d'expiration</Form.Label>
                        <Form.Control
                            type="date"
                            name="expiration_date"
                            placeholder="date d'expiration"
                        
                            onChange={(evt) => handleChange(evt)}
                        />
                    </Form.Group>
                    <br />
                    <hr/>
                    <Row>
                      <span id="alertForDataGroup"></span>
                      <strong>Données du groupe</strong><br/>
                        {datas?.map((item:any, index:any) => (
                            <div key={index}>
                                <p>{item?.name} </p>
                            </div>
                        ))}
                    </Row>
                    <Row>

                    <DataAdditionnalsCreate handleAdddataSharing={handleAdddataSharing}/>
                        
                        
                    </Row>
                    <hr />
                    <FormGroup as={Row} controlId="contactControl">
                        <Form.Label><strong>Liste des contacts</strong></Form.Label>
                        {contact.map((item: any, index: any) => (
                            
                            <div key={`default-${index}`} className="mb-3 col-sm-4">
                                
                                    <Form.Check 
                                        type="checkbox"
                                        id={`default-${index}`}
                                        label={item}
                                        onChange={(evt) => handleChangeContact(evt)}
                                        name="group_users"
                                        value={item}
                                    />
                            </div>    
                        ))}

                    </FormGroup>
                    <br/>
                  
                    <div className="d-grid gap-2">
                    <Button type="submit" variant="primary" size="lg">
                    Créer le groupe
                    </Button>
                    </div>
                    

                   

                </Form>

                </div>

            </Container>
            <br/>
            <br/>
            
        </>
    )
}