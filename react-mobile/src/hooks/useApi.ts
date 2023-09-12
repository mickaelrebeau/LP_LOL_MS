import { NavContext } from '@ionic/react';
import axios, { AxiosInstance } from 'axios';


export function useApi() {

    const headers = { 'Access-Control-Allow-Origin': '*' };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers
    })

    //on peut definir un intercepteur
    api.interceptors.request.use((config) => {
        // @dev gérer les token avec le hook
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers['Authorization'] = "Bearer " + token;
        }
        return config;
    })


    api.interceptors.response.use(
        (response) => response,
        (error) => {
          // @dev Adapter le retour selon votre back et gérer la réponse
          if (error.response && error.response.status === 401) {
            // Le token a été rejeté (non autorisé)
            // Effacer le token dans le localstorage
            // Rediriger l'utilisateur vers sign
          
          }
          if (error.response && error.response.status === 404) {
            // Le token a été rejeté (non autorisé)
            // Effacer le token dans le localstorage
            // Rediriger l'utilisateur vers sign
            console.log('ok')
            location.href = '/home';
          }

          if (error.message === 'Network Error') {
            // Erreur de réseau, afficher un message d'erreur ou rediriger vers une page d'erreur de connexion
            // redirect('/network-error');
    
          }
    
          return Promise.reject(error);
        }
      );
      

    return api
}