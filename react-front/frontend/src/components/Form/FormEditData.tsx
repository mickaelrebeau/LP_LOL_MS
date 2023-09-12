import { useState, useEffect } from 'react';
import { getDataByUserId } from '../../services/api/data';

type userDatas = {
    createdAt: Date,
    info: string,
    name: string,
    updatedAt: Date,
    type: string,
    _id: string,
    user_id: string,
    fields: [
        {
            createdAt: Date,
            updatedAt: Date,
            label: string,
            type: string,
            value: string,
            _id: string,
            mandatory: boolean
        }
    ]

}

const FormEditData = ({user_id}: any) => {
    const [dataSharing, setDataSharing] = useState<any>([]);
    const [isEdit, setIsEdit] = useState<any>([]);
    const [updateDatas, setUpdateDatas] = useState<userDatas[]>([]);

    useEffect(() => {
        getDataByUserId(user_id)
        .then((res) => {
            console.log(res);
            setDataSharing(res);
            let arrOfBool = []
            for (let index = 0; index < res.length; index++) {
                const bool = false;
                arrOfBool.push(bool);   
            }
            setIsEdit(arrOfBool);         
            setUpdateDatas([...res]);
        })
        .catch((err) => console.log(err));
    }, []);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
        const { name, value }:any = e.target;
    //     console.log('datas', toto);
    //    toto = {...toto, [name]: value};
    //     console.log('newdata', toto);
    //     const newData = updateDatas;
    //     newData[index] = toto;
        // setUpdateDatas([...newData]);
        // const item = updateDatas[index];
        // item[name] = value;
        // const newData = [...updateDatas];
        // newData[index] = item;
        // setUpdateDatas([...newData]);
        // console.log(index);
        const updateState = [...updateDatas];
        updateState[index] = { ...updateState[index], [name]: value};
        setUpdateDatas(updateState);

     }

     const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>, index: any, subIndex: any) => {
        // console.log(index, data, subIndex, field);
        // const { name, value }: any = e.target;
        // field = {...field, [name]: value};
        // console.log("field",field);
        // console.log("datafield", data.fields[subIndex]);
        // data.fields[subIndex] = field;
        // const newData = updateDatas;
        // newData[index] = data;
        // setUpdateDatas([...newData]);
        const { name, value}: any = e.target;
    //    const updateState = [...updateDatas];
    //      updateState[index].fields[subIndex] = {...updateState[index].fields[subIndex], [name]: value};
    //    setUpdateDatas([...updateState]);
    const updateState = [...updateDatas];
    updateState[index] = {
        ...updateState[index],
        //@ts-ignore
        fields : updateState[index].fields.map((field: any, i: any) => 
            i === subIndex ? { ...field, [name]: value} : field
        ),
    };
        setUpdateDatas(updateState);

     }

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

    const delAndUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: any) => {
        e.preventDefault();
        const editIs = [...isEdit];
        editIs[index] = !isEdit[index];
        setIsEdit([...editIs]); 
    }

    // const updateData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault();
    //     console.log(datas);
    // }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    }
    const delField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: any, subIndex: any) => {
        e.preventDefault();
        const updatedState = [...updateDatas];
        updatedState[index] = {
            ...updatedState[index],
           //@ts-ignore
            fields: updatedState[index].fields.filter(( _: any, i: any) => i !== subIndex),
        };
        setUpdateDatas(updatedState);
    }

    // const addState1Item = (outerIndex, newItem) => {
    //     const updatedState = [...state1];
    //     updatedState[outerIndex] = {
    //       ...updatedState[outerIndex],
    //       items: [...updatedState[outerIndex].items, newItem],
    //     };
    //     setState1(updatedState);
    //   };

    return (
            <div>
                {isEdit.map((edit: any, index: any) => (
                    edit ? 
                    <form key={index} onSubmit={(e) => onSubmit(e)}>
                        <h3>Titre</h3>
                        <input 
                        type="text" 
                        name='name'  
                        value={updateDatas[index].name}
                        onChange={(e) => handleChange(e, index)} />
                        <h3>Info</h3>
                        <input 
                        type="text" 
                        name='info' 
                        value={updateDatas[index].info}
                        onChange={(e) => handleChange(e, index)} />
                        {updateDatas[index].fields.map((field: any, subIndex: any) => (
                            <div key={subIndex}>
                                <input 
                                type="text"
                                name="label" 
                                value={field.label}
                                onChange={(e) => handleChangeField(e, index, subIndex)}  />
                                <input 
                                type={checkInputType(field.type)} 
                                name="value" 
                                value={field.value}
                                onChange={(e) => handleChangeField(e, index, subIndex)}  />
                                {edit && 
                                <button onClick={(e) => delField(e, index, subIndex)}>suppr</button>
                                }
                            </div>
                        ))}
                        <button onClick={(e) => delAndUpdate(e, index)}>{edit ? "Annuler" : "Modifier"}</button>
                        {edit && 
                        <div>
                            <button type='submit'>Modifier</button>
                            <button>Supprimer</button>
                        </div>
                        }
                    </form>
                    :
                    <form key={index}>
                        <h3>Titre</h3>
                        <input 
                        type="text" 
                        name='name'  
                        readOnly
                        value={dataSharing[index].name}
                        />
                        <h3>Info</h3>
                        <input 
                        type="text" 
                        name='info' 
                        readOnly
                        value={dataSharing[index].info}
                         />
                        {dataSharing[index].fields.map((field: any, subIndex: any) => (
                            <div key={subIndex}>
                                <input 
                                type="text"
                                name="label" 
                                readOnly 
                                value={field.label}
                                />
                                <input 
                                type={checkInputType(field.type)} 
                                name="value" 
                                readOnly 
                                value={field.value}
                                />
                            </div>
                        ))}
                        <button onClick={(e) => delAndUpdate(e, index)}>{edit ? "Annuler" : "Modifier"}</button>
                    </form>
                ))}
            </div>
    );
};

export default FormEditData;