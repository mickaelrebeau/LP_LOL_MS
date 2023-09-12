import { Button, Col, Container, Row } from 'react-bootstrap';
import './Data.module.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDataById } from '../../services/api/data';
import { format } from 'date-fns';


const DataDetailPage = () => {
    
  

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
                <h1 className='p-2'>{data.name}</h1>
                
            </div>
            <div className='border border-dark-subtle shadow my-3 p-4 grow'>
                <Row className='my-4'>
                    <p className='text-center'><span className='light-text'>Description :</span> <br/>
                    {data.info}
                    </p>
              
                </Row>
                <Row className='my-4'>
                    <p className='text-center'>
                        <span className='light-text'>Donnée :</span> <br/>
                        <strong>{data.fields[0]?.label}</strong><br/>
                        {data.fields[0]?.value}
                    </p>
              
                </Row>
            </div>
           
        </div>
        <div className="m-auto mt-5 col-lg-10">
            <Row>
                <div className="d-grid gap-2">
                    <Button type="submit" className="shadow" variant="secondary" size="lg">
                    Modifier
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

export default DataDetailPage;