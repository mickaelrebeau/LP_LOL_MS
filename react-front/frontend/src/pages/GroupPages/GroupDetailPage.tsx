/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Group.module.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGroupById } from '../../services/api/group';
// import { format } from 'date-fns';


const GroupDetailPage = () => {
    
    // const list=["Adresse", "Tel", "Bureau"];
    // const contact=["Jhon Doe", "Léon Patate", "Superman", "Jane Doe", "Marguerite"];

    const {id} = useParams();

    const [group, setGroup]:any = useState({});

    useEffect( () => {
     
      async function loadGroupById(id: any) {
        const groups:any = await getGroupById(id);
        console.log("i",groups)
        setGroup(groups)
      }
  
       loadGroupById(id);
    }, [])

    console.log("group",group);

    return (
        <>
        <Container>
        <div className="m-auto mt-5 col-lg-10">
            <div>
                <Button className='shadow' variant="secondary">Retour</Button>
                <h1 className='p-2'>{group.name}</h1>
                <span className='light-text'>{group.is_default? "Groupe par défaut": " "}</span>
            </div>
            <Row className='my-4'>
                <Col sm={6} className='my-2'>
                    <div className='border border-dark-subtle shadow my-3 p-4 grow'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2> Données du groupe</h2>
                            <span className='btn-teal rounded-pill text-end'><strong>&nbsp; + &nbsp;</strong> </span>
                        </div>
                        <br/>

                        <ul>
                        {
                            group.decriptedDatas?.map((item: any, index: any) => (    
                                <li key={`default-${index}`} className=" mb-3">
                                    <ul>
                                        {item.dataname.map((item2:any, index2:any) => (
                                            <li key={`default-${index2}`} className="disc mb-3"> 
                                            {item2} 
                                            </li>
                                        ))}
                                    </ul>
                                   {/* {item.dataname} &nbsp;  */}
                                   {/* <span className='light-text'> Expire le : {format(new Date(item.expiration), 'dd/MM/yyyy')}</span> */}
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </Col>
                <Col sm={6} className='my-2'>
                    <div  className='border border-dark-subtle shadow my-3 p-4 grow'>   
                        <div className='d-flex justify-content-between align-items-center'>
                        <h2> Membres du groupe</h2>
                            <span className='btn-teal rounded-pill text-end'><strong>&nbsp; + &nbsp;</strong> </span>
                        </div>
                        <br/>
                        {/* <ul>
                        {contact.map((item: any, index: any) => (
                                    
                                    <li key={`default-${index}`} className="disc mb-3">
                                        {item}
                                    </li>
                
                                
                            ))}
                        </ul> */}
                    </div>
                </Col>
                
            </Row>
            <Row>
            <br/>
                {/* <p className='text-center'>Date d'expiration du groupe : {group.expiration_group? (format(new Date(group.expiration_group), 'dd/MM/yyyy')) : "aucune "} </p> */}
            </Row>
        </div>
        <div className="m-auto mt-5 col-lg-8">
            <Row>
                <div className="d-grid gap-2">
                    <Button type="submit" className="shadow" variant="secondary" size="lg">
                    Modifier le groupe
                    </Button>
                </div>
               
                <div className="d-grid gap-2 mt-3">
                    <Button type="submit" className="shadow" variant="danger" size="lg">
                    Supprimer le groupe
                    </Button>
                </div>
            </Row>
        </div>
        </Container>
        <br/>
        <br/>
        </>
    );
};

export default GroupDetailPage;