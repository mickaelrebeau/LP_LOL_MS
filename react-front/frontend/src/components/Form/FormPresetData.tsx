/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAll } from "../../services/api/presetData";
import { postData } from "../../services/api/data";

const FormPresetData = ({user_id}: any) => {

    const [presetData, setPresetData] = useState<any>([]);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [addData, setAddData] = useState<any>({
        user_id: user_id,
        name: "titre",
        info: "info",
        type: 1,
        fields: []
});

    useEffect(() => {
        console.log(user_id);
        getAll()
        .then((res) => {
            console.log(res?.data.datas);
            setPresetData(res?.data.datas);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const checkInputType = (type: any) => {
        const intType = parseInt(type);
        switch (intType) {
            case 0 :
                return 'text';
            case 1 :
                 return 'number';
            case 2 :
                return 'date';
            case 3 :
                return 'file';
            case 4 :
                return 'email'    
        
            default:
                break;
        }
    }
    const checkPresetData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       e.preventDefault()
       console.log(e.currentTarget.innerHTML);
       const res = presetData.filter((preset: any) => preset.name == e.currentTarget.innerHTML );
       console.log(res[0].fields);
       const allInput: any = []
       res[0].fields.map((field: any) => {
        const fieldsInput = {
            label: field.label,
            mandatory: field.mandatory,
            type: field.type,
            value: ""
        }
        allInput.push(fieldsInput);
        console.log(fieldsInput);
    
       });
       console.log(allInput);
       setAddData({...addData , fields: [...addData.fields, ...allInput]});
       
    }

    const delOneData = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, index: any) => {
        e.preventDefault();
        console.log(index);
        const res = addData.fields.filter((preset: any) => preset !== index);
        console.log(res);
        setAddData({...addData , fields: res});
        
    }

    const setInputOrLabelValue = (e: React.ChangeEvent<HTMLInputElement>, index: any, champs: any, isValue: boolean) => {
        e.preventDefault();
        isValue ? champs.value = e.target.value : champs.label = e.target.value;
        const data = addData;
        console.log(data)
        data.fields[index] = champs;
        setAddData(data);
    }

    const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(addData);
        postData(addData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <button onClick={() => setIsAdd(!isAdd)}>{isAdd ? "annuler" : "ajouter"}</button>
            { isAdd &&
            <div>
                {presetData.map((preset: any, index:any) => (
                        <button onClick={(e) => checkPresetData(e)} key={index}>{preset.name}</button>
                    ))}
                <form onSubmit={(e) => submitFormData(e)}>
                        <label htmlFor={addData.name}>Titre de la donnée</label>
                        <input type="text" onChange={(e) => setAddData({...addData, name: e.target.value})} value={addData.name} />
                        <label htmlFor={addData.info}>Info</label>
                        <input type="text" name={addData.info} onChange={(e) => setAddData({...addData, info: e.target.value})} value={addData.info} />
                        {addData.fields && 
                        addData.fields.map((champs: any, index: any) => (
                            <div key={index}>
                                <label htmlFor="titre">Nom du champ</label>
                                <input type="text" name="titre" onChange={(e) => setInputOrLabelValue(e, index, champs, false)} />
                                <label  htmlFor="valeur">Valeur du champ </label>
                                <input onChange={(e) => setInputOrLabelValue(e, index, champs, true)} name="valeur" type={checkInputType(champs.type)} />
                                <button onClick={(e) => delOneData(e, champs)}>del</button>
                            </div>
                        )) }
                        <input type="submit" value="Ajouter" />
                </form>
            </div> }
        </div>
    );
};

export default FormPresetData;