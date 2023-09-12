import { useApi } from '../../hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


export async function getGroupByUserId() {
   
    try {
        const groupsObject = await api.get(`group`);
        console.log(groupsObject)
        const groups = Object.values(groupsObject.data.datas);
        console.log(groups)
        return groups;
    } catch (err) {
        console.log(err);
    }
}

export async function getOneByUserId(id: any) {
   
    console.log(id)
    try {
        const onesObject = await api.get(`one/all/${id}`);
        console.log("object",onesObject)
        const ones = Object.values(onesObject.data.decriptedDatas);
        console.log("ones",ones)
        return ones;
    } catch (err) {
        console.log(err);
    }
}

export async function getGroupById(id: any) {
   
    console.log(id)
    try {
        const group = await api.get(`group/${id}`);
        console.log(group)
        return group.data.group;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function putUpdateGroupById(id: any) {

    console.log(id)
    try {
        const group = await api.put(`group/update/${id}`);
        console.log(group)
        return group.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function createGroup(body: any){
   
    try {
        const result = await api.post(`group`, body);
        
        return result;
    } catch (err) {
        console.log(err);
    }
}