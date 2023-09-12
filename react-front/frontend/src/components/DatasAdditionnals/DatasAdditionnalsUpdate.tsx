import React, { useEffect, useState } from "react";
import "./DatasAdditionnals.css";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import { getDataById, putUpdateDataAdd } from "../../services/api/data";

export default function DatasAdditionnalsUpdate(props: { datasSharingId: any; }){
    // const datasSharingId = ["64bfcdb0bf695c97033fc8b5"];
    const datasSharingId = props.datasSharingId
    // dataSharingId est un tableau d'id correspondant à des data_sharing
    console.log(datasSharingId)
    
   
    const [datasSharing, setDatasSharing]:any = useState([]);

   console.log("datasSharing!!",datasSharing)

    const [dataS, setDataS]:any = useState([
        {
            id: "",
            expiration_date: ""
        }
    ])

    console.log("Boum", dataS)

    // const handleDataS = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>| React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value, type, checked } = e.target;
    //     if (type === "checkbox") {
    //       // Gestion des cases à cocher (checkboxes)
    //       const selectedOptions = dataS.includes(value)
    //         ? dataS.filter((input: string) => checked !== value)
    //         : [...dataS, value];
      
    //       setDataS({ ...dataS, id: selectedOptions });
    //     } else {
    //       // Gestion des autres types de champs
    //       setDataS({ ...dataS, expiration_date: value });
    //     }
    //   };

    // const handleDataS = (id:number) => {
    //     setDataS((datasSharing: any[]) => datasSharing.map(item =>
    //         item.data.expiration_date === dataS.expiration_date ? {...dataS, checked: !dataS.checked }: dataS)
    //         );
    // }

    useEffect( () => {
        async function loadDatasSharing(datasSharingId: any[]){
            const datasSharingData = [];
            for (let id of datasSharingId){
                console.log("coucou_id", id)
                //id est l'id d'un data_sharing
                let data:any = await putUpdateDataAdd(id);
                //data : récupération du contenu de l'objet data_sharing
                data.expiration_date = formatDate(data.expiration_date, "-");
                console.log("hello_data", data)
                setDataS([...dataS, data])
                let decriptedData:any = await getDataById(data.data);
                // data.data récupère l'id de la donnée du data_sharing
                // decriptedData récupère le contenu de la donnée
                datasSharingData.push({"decriptedData":decriptedData, "data":data})
                console.log("datasSharingData", datasSharingData)
                //datasSharingData : tableau avec les objets data dans leur ensemble, pas seulement les id
            }
            setDatasSharing(datasSharingData)
        }
            loadDatasSharing(datasSharingId);
    }, [datasSharingId])

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
        const month = newFormat.getMonth() + 1;
        const day = newFormat.getDate();
        const year = newFormat.getFullYear();

        // return `${day}/${month}/${year}`;
        return day + "/" + month + "/" + year;
      }

      function handleChangeExpiration(evt: any, index: number) {
        const { value }: any = evt.target;
        const copyDataSharing:any = [...datasSharing];
        copyDataSharing[index].data.expiration_date = formatDate(value, '-');
        setDatasSharing(copyDataSharing)
        
      }

      function handleChangeCheckBox(evt: any, index: number) {
        const { checked }: any = evt.target;
        console.log(checked)
        console.log(index)
        const copyDataSharing:any = [...datasSharing];
        console.log(copyDataSharing)
        /*const copyDataSharing:any = [...datasSharing];
        copyDataSharing[index].data.expiration_date = formatDate(value, '-');
        setDatasSharing(copyDataSharing)*/
      }


    return(
    
           
            <FormGroup controlId="dataControl">
                <Form.Label><strong>Liste des données</strong></Form.Label>
                {datasSharing?.map((item: any, index: any) => (
                        <div key={`default-${index}`} className="mb-2">
                        <Row className="survol py-1">
                            <Col sm={4}>
                             
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        value={item.decriptedData.name} 
                                        id={`groupdata-${index}`} 
                                        defaultChecked={true}
                                        onChange={ (evt) => handleChangeCheckBox(evt, index) } >
                                    </input>
                                    <label className="form-check-label" htmlFor={`groupdata-${index}`}>
                                        {item.decriptedData.name}
                                    </label>
                                </div>
                                 
                            </Col>
                            <Col sm={8}>
                            
                                <Row>
                                    <Col sm={4}>
                                    <p className="text-end"> Date d'expiration </p>
                                    </Col>
                                    <Col sm={8}>
                                    {/* <p> {JSON.stringify(item.data.expiration_date)} </p>  <br /> */}
                                        <div className="form-floating mb-3">

                                              
                                            <input type="date" className="form-control" id={`expdate_data-${index}`} 
                                            placeholder={item.data.expiration_date} value={item.data.expiration_date}
                                            onChange={ (evt) => handleChangeExpiration(evt, index) }
                                            /* onChange={() => handleDataS(item.data.expiration_date)} */
                                            name={item.data.data.id} ></input>
                                          {/*  <label htmlFor="floatingInput">{item.data?.expiration_date?formaterDate(item.data.expiration_date):"Pas de date d'expiration"}</label>*/} 
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </div>
                    ))}
            </FormGroup>       
                
    
    )
}