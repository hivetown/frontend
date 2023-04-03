import { ApiRequest } from "../types/interfaces";
import axios from "axios";
import store from "../store";
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
    // listenCookieChange(({ newValue }) => {
    //     // if the cookie is removed or changed, we need to redirect the user to the login page and return false
    //     if (!newValue) {
    //         router.push('/login');
    //         return false;
    //     }
    //     return true;
    // });

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);




// function listenCookieChange(callback, interval = 1000) {
//   const { token } = store.state;
//   setInterval(()=> {
// 	// save content of cookie in variable
// 	let cookie = document.cookie;
//     if (cookie !== token) {
//       try {
// 		// the next line will throw an error if the cookie has been deleted
//         // redirect user to login page
//         callback({oldValue: lastCookie, newValue: cookie});
// 		return true;
//       } catch {
// 		return false;
//       }
//     }
//   }, interval);
// }


// export default {
//     setup() {  
//       return {
//         listenCookieChange
//       }
//     }
//   }
   
  
  