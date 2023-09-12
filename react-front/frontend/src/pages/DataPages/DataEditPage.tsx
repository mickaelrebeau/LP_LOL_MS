import { Button, Col, Container, Row, Form, FormGroup } from 'react-bootstrap';
import './Data.module.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDataById } from '../../services/api/data';
import { format } from 'date-fns';


const DataEditPage = () => {
    
  

    const {id} = useParams();

    const [data, setData]:any = useState({});

    useEffect( () => {
     
      async function loadDataById(id: any) {
        const userdata:any = await getDataById(id);
        console.log("i",userdata)
        setData(userdata)
      }
  
       loadDataById(id);
    }, [])

    console.log("données",data);

    return (
        <>
        <Container>
        <div className="m-auto mt-5 col-lg-10">
            <div>
                <Button className='shadow' variant="secondary">Retour</Button>
                <h1 className='p-2'>Modifier la donnée</h1>
                
            </div>
            <div className='border border-dark-subtle shadow my-3 p-4 grow'>
                <Form>
                    <Row>
                        <Col sm={2}>
                            Nom :
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder={data.name} />
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        <Col sm={2}>
                            Description :
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text-area" placeholder={data.info} />
                        </Col>
                    </Row>
                    <br/>
                    <Row className='my-4'>
                        <Col sm={2}>
                            Label :
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder={data.fields[0]?.label} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            Donnée :
                        </Col>
                        <Col sm={10}>
                            <Form.Control type="text-area" placeholder={data.fields[0]?.value} />
                        </Col>
                        
                
                    </Row>
                    <Row>
                        <div className="d-grid gap-2">
                            <Button type="submit" className="shadow" variant="secondary" size="lg">
                                Valider
                            </Button>
                        </div>
                        <div className="d-grid gap-2">
                            <Button type="submit" className="shadow" variant="danger" size="lg">
                                Supprimer
                            </Button>
                        </div>
                    </Row>
                
               
                
            
                </Form>
            </div>
           
        </div>
        <div className="m-auto mt-5 col-lg-10">
            
        </div>
        </Container>
        <br/>
        <br/>
        </>
    );
};

export default DataEditPage;