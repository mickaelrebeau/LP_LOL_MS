import { Button, Form } from "react-bootstrap";
import "./Data.module.css";
import { useState } from "react";

export default function DataCreatePage(props:any){

    const id = "zhou556";

    const { handleUserData } = props;

    const [userdata, setUserdata] = useState({
        user_id:id,
        name:"",
        info:"",
        type:"",
        fields:[]
    })

  /*  {
        "user_id":"bebe431",
        "name":"tel de machin",
        "info":"humm",
        "type":1,
        "fields":[{
            "type":0,
            "label":"tel",
            "mandatory":false,
            "value":"0677885544"
        }]
    } */

    function handleSubmit(evt:any) {
        evt.preventDefault();
        //handleUserData(userdata);
        console.log("userdata", userdata)
      }
    
      function handleChange(evt:any) {
        const { name, value, info, type, fields }:any = evt.target;
        setUserdata({...userdata, [name]: value, [info]: value, [type]: value, [fields]:value});
      }

    return (
        <>
         <div className="m-auto col-lg-8 mt-5">
            <h1> Créer une nouvelle donnée </h1>

            <br/>
            <br/>
            <Form onSubmit= {(evt) => handleSubmit(evt)}>
            <Form.Control type="text" placeholder="Nom de la donnée" onChange={(evt) => handleChange(evt)} /> 
            <br/>
            <Form.Control as="textarea" rows={3} placeholder="Description" onChange={(evt) => handleChange(evt)}/>
            <br/>
            <Form.Select aria-label="fieldsEnum" onChange={(evt) => handleChange(evt)}>
                <option>Type de donnée :</option>
                <option value="0 | 1">Adresse / Téléphone / Information</option>
                <option value="2">Date</option>
                <option value="3">Fichier</option>
            </Form.Select>
            <br/>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                <Form.Control type="text" placeholder="Label" onChange={(evt) => handleChange(evt)}/> 
                <Form.Control as="textarea" rows={2} placeholder="Rentrer votre donnée ici" onChange={(evt) => handleChange(evt)}/>
            </Form.Group>
            <br/>
            <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg">
                Créer la donnée
                </Button>
            </div>
            </Form>
         </div>
         <br/>
         <br/>
        </>

    )
}