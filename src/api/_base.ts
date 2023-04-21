import { ApiRequest } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import store from "../store";
// import { useRoute} from "vue-router";

// import ErrorPopup from '../components/ErrorPopup.vue'
import ErrorPopup from '@/components/ErrorPopup.vue'
import { createApp, watchEffect } from 'vue';
import router from "../router";



function makeApi(baseURL: string, options: ApiRequest = {}) {
    const headers = { ...options?.headers };

    const api = axios.create({
        baseURL,
        ...options,
        headers,
    });

    api.interceptors.request.use((config) => {
        // Inject the token into the headers
        const { token } = store.state;
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
    

    api.interceptors.response.use(
        (response) => response,
        
        (error: AxiosError) => {
                        
            // try {

            //     const { response } = error

            //     if (!response || !response.status || !response.data) {
            //       // Handle the error without a message
            //       return Promise.reject(error)
            //     }
            
            //     const errorMessage = `Erro ${response.status}`
            //     const ErrorPopupComponent = createApp(ErrorPopup, { message: errorMessage })
            //     const errorPopupInstance = ErrorPopupComponent.mount(document.createElement('div'))
            
            //     document.body.appendChild(errorPopupInstance.$el)
            
            //     setTimeout(() => {
            //       document.body.removeChild(errorPopupInstance.$el)
            //     }, 3000)
            
            //   } catch (error) {
            //     console.log("Error creating ErrorPopup:", error);
            //   }
            if (error.response.status === 401 && router.currentRoute.value.meta.requiresAuth) {
              console.log('router', router.currentRoute.value)
              try {

                const { response } = error

                if (!response || !response.status || !response.data) {
                  // Handle the error without a message
                  return Promise.reject(error)
                }
            
                const errorMessage = `Erro ${response.status}`
                const ErrorPopupComponent = createApp(ErrorPopup, { message: errorMessage })
                const errorPopupInstance = ErrorPopupComponent.mount(document.createElement('div'))
            
                document.body.appendChild(errorPopupInstance.$el)
            
                setTimeout(() => {
                  document.body.removeChild(errorPopupInstance.$el)
                }, 3000)
            
              } catch (error) {
                console.log("Error creating ErrorPopup:", error);
              }
                console.log('401 error')
            } else if (error.response.status === 403) {
              try {

                const { response } = error

                if (!response || !response.status || !response.data) {
                  // Handle the error without a message
                  return Promise.reject(error)
                }
            
                const errorMessage = `Erro ${response.status}`
                const ErrorPopupComponent = createApp(ErrorPopup, { message: errorMessage })
                const errorPopupInstance = ErrorPopupComponent.mount(document.createElement('div'))
            
                document.body.appendChild(errorPopupInstance.$el)
            
                setTimeout(() => {
                  document.body.removeChild(errorPopupInstance.$el)
                }, 3000)
            
              } catch (error) {
                console.log("Error creating ErrorPopup:", error);
              }
            } else if (error.response.status === 404) {
              try {

                const { response } = error

                if (!response || !response.status || !response.data) {
                  // Handle the error without a message
                  return Promise.reject(error)
                }
            
                const errorMessage = `Erro ${response.status}`
                const ErrorPopupComponent = createApp(ErrorPopup, { message: errorMessage })
                const errorPopupInstance = ErrorPopupComponent.mount(document.createElement('div'))
            
                document.body.appendChild(errorPopupInstance.$el)
            
                setTimeout(() => {
                  document.body.removeChild(errorPopupInstance.$el)
                }, 3000)
            
              } catch (error) {
                console.log("Error creating ErrorPopup:", error);
              }
            } 
            
            return Promise.reject(error);
        }
    
      );

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);



