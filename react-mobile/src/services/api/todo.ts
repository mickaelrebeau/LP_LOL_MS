import { useApi } from '../../hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


export async function getTodos() {
    try {
        const { data } = await api.get('todos');
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getTodoById(id: any) {
    console.log('mon id Todo')
    console.log(id)
    try {
        const { data } = await api.get(`posts/${id}`);
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function postArticle() {

    const body: any = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    try {
        const { data } = await api.post(`posts`, body)
        return data
    } catch (err: any) {
        console.log(err)
    }
}