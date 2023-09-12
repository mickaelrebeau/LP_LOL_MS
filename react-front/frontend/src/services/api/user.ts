/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from '../../hooks/useApi';


const api = useApi();
   
export async function login(body: { email: string; password: string; }) {
    try {
        const data = await api.post("/auth/login", body)
        console.log(data);
        return data.data.datas;
    } catch (err) {
        console.log(err);
    }
}

export async function signup(body: {
        firstname: string; lastname: string; pseudo: string;
        email: string; password: string;
    }) {
    try {
        const data = await api.post("/auth/signup", body)
        return data.data.datas;
    } catch (err) {
        console.log(err);
    }
}

export async function resetPassword(body: {
    password: string
}) {
    try {
        const data = await api.post("/auth/reset-password", body)
        return data.data.datas;
    } catch (err) {
        console.log(err);
    }
}

export async function checkPassword(values: { password: string}) {
    try {
        const response = await api.post('/profil/check-password', { password: values.password });
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function authorizationProfil() {
    try {
        const response = await api.get('/profil')
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function updateProfil(values: {
    firstname?: string, lastname?: string, pseudo?: string
}) {
    try {
        const response = await api.post('/profil', values);
        return response;
        
    } catch (error) {
        console.log(error);
    }
}

export async function updateEmailAndOrPassword(values: {
    userId: string, email?: string, password?: string
}) {
    try {
        const res = await api.post('/profil/email-password', values);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserPassword(values: {
    userId: string, password: string
}) {
    try {
        const res = await api.post('/profil/password', values)
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserEmail(values: {
    userId: string, email: string
}) {
    try {
        const res = await api.post('/profil/email', values)
        return res;
    } catch (err) {
        console.log(err);
    }
}


export async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
            const response = await api.post('/refresh-token', {headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        }
        );
            
            const { token, newRefreshToken } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', newRefreshToken);

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
