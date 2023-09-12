/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import './Group.module.css'
import { useEffect, useState } from 'react';
import DatasOneUser from '../../components/Modals/ModalDatasOneUserCreate';
// import DatasAdditionnals from '../../components/DatasAdditionnals/DatasAdditionnalsCreate';
// import UpdateDatasOneUser from '../../components/Modals/ModalDatasOneUserUpdate';
import { useParams } from 'react-router-dom';
import { putUpdateGroupById } from '../../services/api/group';
// import { format } from 'date-fns';
import DatasAdditionnalsUpdate from '../../components/DatasAdditionnals/DatasAdditionnalsUpdate';
// import DatasAdditionnalsCreate from '../../components/DatasAdditionnals/DatasAdditionnalsCreate';
// import ModalDataAdditionnalUpdate from '../../components/Modals/ModalDataAdditionnalUpdate';

const GroupEditPage = () => {

//     const list=["Adresse du grand-frère de la soeur de machin", "Tel", "Bureau"];
//     const id="zhou556"
//     // const list = getDataByUserId(id);
   const contact=["John Doe", "Léon Patate", "Superman"];

    const {id} = useParams();
   
    const [group, setGroup]:any = useState({
        expiration_date : '',
        
    });
    // @ts-ignore
    const [contacts, setContacts] = useState([]);

    useEffect( () => {
     
        async function loadGroupById(id: any) {
          const group:any = await putUpdateGroupById(id);
          
          console.log("i",group, group.expiration_date)
          group.expiration_date = formatDate(group.expiration_date, "-");
          console.log('coucoucouc', group)
          setGroup(group)
        }
    
         loadGroupById(id);
      }, [])
  
      console.log("group",group, group.expiration_date);

    //   const datasSharingId = group.data_sharing;

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
        const month = padTo2Digits(newFormat.getMonth() + 1);
        const day = padTo2Digits(newFormat.getDate());
        const year = newFormat.getFullYear();

        // return `${day}/${month}/${year}`;
        return day + "/" + month + "/" + year;
      }
    
    return (
        <>
        <Container>
        <div className="m-auto mt-5 p-5 col-lg-10 border border-dark-subtle shadow">
            <div>
                <h1>Modifier ce groupe</h1>
            </div>
            <br />
            <br />

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="groupName">
                    <Form.Label column sm="2">
                        Nom du groupe
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder={group.name} />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} className="mb-3" controlId="expdate">
                    <Form.Label column sm="2">Date d'expiration</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            name="expdate"
                            placeholder={formaterDate(group.expiration_date)}
                            // placeholder={format(new Date(group.expiration_date), 'dd/MM/yyyy')}
                            // value={formaterDate(group.expiration_date)}
                            // value={group.expiration_date}
                            value="30-09-2023"
                            // value={format(new Date(group.expiration_date), 'dd/MM/yyyy')}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Col>
                </Form.Group> */}
                <Row>
                    <Col sm={2}>
                        Date d'expiration
                    </Col>
                    <Col sm={10}>
                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="floatingInput" 
                            placeholder={group.expiration_date} value={group?.expiration_date}
                            onChange={(e) => setGroup({...group, 'expiration_date': e.target.value})}></input>
                            <label htmlFor="floatingInput">{group?.expiration_date?formaterDate(group.expiration_date):"Pas de date d'expiration"}</label>
                        </div>
                    </Col>
                </Row>
                    
                <br/>
                <hr/>
                <Row>
                    
                    <DatasAdditionnalsUpdate datasSharingId = {group.data_sharing}/>    
                   
                </Row>
                <Row>
                    {/* <ModalDataAdditionnalUpdate /> */}
                </Row>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>➕ Ajouter des données au groupe</Accordion.Header>
                            <Accordion.Body>
                                {/* <DatasAdditionnalsCreate/> */}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
                </Row>
                    <hr />
                    <FormGroup as={Row} controlId="contactControl">
                        <Form.Label><strong>Liste des contacts</strong></Form.Label>
                        {contact.map((item: any, index: any) => (
                            
                            <div key={`contact-${index}`} className="mb-3 col-sm-4">
                                
                                    <Form.Check 
                                        type="checkbox"
                                        id={`contact-${index}`}
                                        label={item}
                                        // onChange={(e) => setContacts(e.target.value)}
                                    />
                                
                            </div>
            
                            
                        ))}

                    </FormGroup>
                    <br/>

                <Row className='justify-content-end'>
                    <Col sm={4} className='d-grid gap-2 my-1'> 
                        <Button variant="danger">
                          Annuler  
                        </Button>
                    </Col>
                    <Col sm={4} className='d-grid gap-2 my-1'>
                        <Button type="submit" variant="primary">
                            Valider
                        </Button>
                    </Col>
                </Row>
                
            </Form>
            <br/>
            <Row className='justify-content-end'>
                <Col sm={8} className='d-grid gap-2'>
                    <DatasOneUser />
                </Col> 
            </Row>
            
        </div>
        </Container>
        <br/>
        <br/>
        </>
    );
};

export default GroupEditPage;