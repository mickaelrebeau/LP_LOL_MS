import { useApi } from '../../hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function getDataByUserId(id: any) {
   
    console.log(id)
    try {
        const datasUser = await api.get(`data/all/${id}`);
        console.log("datasUser", datasUser)
        return datasUser.data.users;
    } catch (err) {
        console.log(err);
    }
}

export async function getDataById(id: any) {
   
    console.log(id)
    try {
        const { data } = await api.get(`data/${id}`);
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function postData(body: any) {
   
    try {
        const createData = await api.post(`data`, body);
        console.log(createData)
        return createData;
    } catch (err) {
        console.log(err);
    }
}

export async function putUpdateData(id: any){
    console.log(id)
    try {
        const { data } = await api.put(`data/update/${id}`);
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function putUpdateDataAdd(id: any){
    console.log(id)
    try {
        const { data } = await api.put(`data-add/update/${id}`);
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function createDataSharing(body: any){
   
    try {
        const result = await api.post(`data-add`, body);
        
        return result;
    } catch (err) {
        console.log(err);
    }
}

