import { ApiRequest } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import store from "../store";
import router from "../router";

import { ref } from 'vue'



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
    // listenCookieChange(({ newValue }) => {
    //     // if the cookie is removed or changed, we need to redirect the user to the login page and return false
    //     if (!newValue) {
    //         router.push('/login');
    //         return false;
    //     }
    //     return true;
    // });

    // api.interceptors.response.use(
    //     (response) => response,
    //     console.log('interceptor called'),
    //     (
    //     (error) => {
    //         console.log("error.response.status:", error.response.status);
    //         if (error.response.status === 401) {
    //             // store.commit("logout");
    //             // router.push("/login");
    //             console.log('401 error')
    //         } else if (error.response.status === 403) {
    //             // router.push("/403");
    //             console.log('403 error')
    //         } else if (error.response.status === 404) {
    //             // router.push("/404");
    //             console.log('404 error')
    //         } 
    //         return Promise.reject(error);
    //     }
    // )
    //   );

    api.interceptors.response.use(
        (response) => response,
        
        (error: AxiosError) => {
            console.log("error.response.status:", error.response.status);
            if (error.response.status === 401) {
                store.commit('logout')
                // remove token from cookie
                console.log('401 error')
            } else if (error.response.status === 403) {
                store.commit('logout')
                console.log('403 error')
            } else if (error.response.status === 404) {
                store.commit('logout')
                console.log('404 error')
            } 
            return Promise.reject(error);
        }
    
      );

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);



// export const validCookie = ref(true)

// function listenCookieChange(interval = 1000) {
//   let lastCookie = document.cookie;
//   setInterval(()=> {
//     let cookie = document.cookie;
//     if (cookie !== lastCookie) {
//       validCookie.value = false;
//     } else if (cookie === lastCookie) {
//       validCookie.value = true;
//     }
//   }, interval);
// }


// listenCookieChange();

// export default {
//   setup() {  
//     return {
//       validCookie
//     }
//   }
// }


///////////////////////////////////////

  
// export function listenCookieChange(interval = 1000) {
//     console.log('cookie change')
//     const validCookie = ref(true); // use a reactive ref
  
//     let lastCookie = document.cookie;
//     // console.log('document.cookie:', document.cookie);
//     setInterval(()=> {
//     //   console.log('interval called');
      
//       let cookie = document.cookie;
//     //   console.log("Cookie value:", cookie);
//       if (cookie !== lastCookie) {
//         validCookie.value = false;
//         return validCookie
//       } else if (cookie === lastCookie) {
//         validCookie.value = true;
//       }
//     //   console.log('validCookie:', validCookie.value);
//     }, interval);
//     console.log('validCookie:', validCookie.value);
    
//   }

//   var intervalId = window.setInterval(function(){
//     // console.log('interval called');
//     listenCookieChange();
//   }, 1000);

// export function listenCookieChange(interval = 1000) {
//     const validCookie = ref(true);
  
//     let lastCookie = document.cookie;
//     console.log('cookie change')
//     const intervalId = setInterval(() => {
//       console.log('interval called'); // additional console log
//       let cookie = document.cookie;
//       if (cookie !== lastCookie) {
//         validCookie.value = false;
//         clearInterval(intervalId);
//       } else {
//         validCookie.value = true;
//       }
//     }, interval);
  
//     return new Promise((resolve, reject) => {
//       const checkValidCookie = () => {
//         if (validCookie.value === false) {
//           clearInterval(intervalId);
//           resolve(validCookie);
//         } else {
//           setTimeout(checkValidCookie, interval);
//         }
//       };
//       checkValidCookie();
//     });
//   }
  

  
  
  
///////////////////////////////////////







// export function listenCookieChange(interval = 5000) {
//     const validCookie = ref(true);
  
//     let lastCookie = document.cookie;
  
//     const intervalId = setInterval(() => {
//       let cookie = document.cookie;
  
//       if (cookie !== lastCookie) {
//         validCookie.value = false;
//         clearInterval(intervalId);
//       }
  
//       lastCookie = cookie;
//     }, interval);
  
//     return new Promise((resolve, reject) => {
//       const checkValidCookie = () => {
//         if (validCookie.value === false) {
//           clearInterval(intervalId);
//           resolve(validCookie);
//         } else {
//           setTimeout(checkValidCookie, interval);
//         }
//       };
  
//       checkValidCookie();
//     });
//   }








// export function listenCookieChange(interval = 5000) {
//     const validCookie = ref(true);
//     let lastCookie = document.cookie;
  
//     const promise = new Promise((resolve) => {
//       const intervalId = setInterval(() => {
//         const cookie = document.cookie;
//         if (cookie !== lastCookie || cookie === '') {
//           validCookie.value = false;
//           clearInterval(intervalId);
//           resolve(validCookie);
//         }
//       }, interval);
//     });
  
//     return promise;
//   }

// const validCookie = await listenCookieChange();
// console.log('validCookie:', validCookie);





// export function listenCookieChange(interval = 5000) {
//   const validCookie = ref(true);
//   let lastCookie = document.cookie;
//   console.log('cookie change')
//   setInterval(() => {
//     const cookie = document.cookie;

//     // If cookie with name token does not exist or is empty
//     if (!cookie || cookie === '' || cookie !== lastCookie) {
//       validCookie.value = false;
//       console.log('validCookie:', validCookie.value);
//     } else {
//       validCookie.value = true;
//     }

//     lastCookie = cookie;
//   }, interval);

//   return validCookie;
// }

// export function listenCookieChange() {
//     const validCookie = ref(true);
//     let lastCookie = document.cookie;
//     // console.log('cookie change')
//       const cookie = document.cookie;
  
//       // If cookie with name token does not exist or is empty
//       if (!cookie || cookie === '' || cookie !== lastCookie) {
//         validCookie.value = false;
//         console.log('validCookie:', validCookie.value);
//       } else {
//         validCookie.value = true;
//       }
  
//       lastCookie = cookie;

//     return validCookie;
//     }

//     // set interval to call listenCookieChange every 5 seconds
// var intervalId = window.setInterval(function(){

//     listenCookieChange();
//     }
// , 2000);







//////////////////////////////////////////////////////
// import request from 'axios';


// request.interceptors.response.use(
//   response => {
//     if (response.status === 512) throw new Error(); // Cloudflare always-on response
//     return response.data;
//   },
//   error => {
//     if (!error.response) {
//       const json = error.toJSON();
//       const url = new URL(json.config.baseURL);

//       if (url.pathname !== '' && url.pathname.startsWith('/err')) {
//         router.push({
//           name: 'Error',
//           params: { id: '503' },
//           query: {}
//         });
//       }

//       return Promise.reject(error);
//     }

//     // displayAlert(error.response.data.message ?? 'Erro inesperado.')
//     console.log('Error response status:', error.response.status);
//     switch (error.response.status) {
//       case 401: 
//         console.log('401');
//       case 403: // Forbidden
//         console.log('403');
//         // router.push({ name: 'IdLogin', query: { redirect: window.location.pathname ?? '/' } })
//     }

//     // router.push({ name: 'Error', params: { id: error.response.status }, query: {} })

//     return Promise.reject(error.response.data);
//   }
// );

// export default request;



// import request from 'axios';

// request.interceptors.response.use(
//     response => {
//       console.log('Interceptor called'); // add this log statement
//       if (response.status === 512) throw new Error(); // Cloudflare always-on response
//       return response.data;
//     },
//     error => {
//       if (!error.response) {
//         const json = error.toJSON();
//         const url = new URL(json.config.baseURL);
  
//         if (url.pathname !== '' && url.pathname.startsWith('/err')) {
//           router.push({
//             name: 'Error',
//             params: { id: '503' },
//             query: {}
//           });
//         }
  
//         return Promise.reject(error);
//       }
  
//       // displayAlert(error.response.data.message ?? 'Erro inesperado.')
//       console.log('Error response status:', error.response.status);
//       switch (error.response.status) {
//         case 401: 
//           router.push({ name: 'IdLogin', query: { redirect: window.location.pathname ?? '/' } })

//           console.log('401');
//         case 403: // Forbidden
//           console.log('403');
//           router.push({ name: 'IdLogin', query: { redirect: window.location.pathname ?? '/' } })
//       }
  
//       // router.push({ name: 'Error', params: { id: error.response.status }, query: {} })
  
//       return Promise.reject(error.response.data);
//     }
//   );
  
//   export default request;



//   request.get('/auth')
//   .then(response => {
//     console.log('response:', response);
//   })
//   .catch(error => {
//     console.log('error:', error);
//   });




