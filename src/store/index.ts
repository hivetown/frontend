import { createStore } from "vuex";
import { createApp } from "vue";
import PrimeVue from "primevue/config";

import router from "../router";
import { auth } from "../components/firebase";

import { postConsumer } from "../api/consumers";
import { postProducer } from "../api/producers";
import { fetchAuth } from "../api/auth";

import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
// import transaction from axios;
import transaction from "firebase/transaction";
import { getCookie, setCookie, removeCookie } from "./cookies";

import firebase from "firebase/app";

import saveValue from "../views/Registration.vue";
import userType from "../views/Registration.vue";
// import getUserType from '../views/Registration.vue';

import Registration from "../views/Registration.vue";

import { useStore } from "vuex";
import { postAddressConsumer } from "../api/addressConsumer";
import { Consumer, Producer } from "@types/interfaces";
import { api } from "../api/_base";
import { Transaction } from 'firebase/firestore';

const saveUser = (uid) => {
    // add new user to database
    localStorage.setItem("uid", uid);
    console.log(uid);
};

const saveEmail = (email) => {
    localStorage.setItem("email", email);
    console.log(email);
};

// export default createStore({
//     state: {
//         token: getCookie('token'),
//         user: {
//             id: 0,
//             name: '',
//             email: '',
//             phone: '',
//             vat: '',
//             type: '',
//         }
//     },
//     mutations: {
//         SET_USER (state, user) {
//             for (const key in user) {
//                 state.user[key] = user[key]
//             }
//         },
//         CLEAR_USER (state, user) {
//             for (const key in user) {
//                 state.user[key] = null
//             }
//         },
//         SET_TOKEN (state, token) {
//             state.token = token
//             setCookie('token', token, 1)
//         },
//         CLEAR_TOKEN (state) {
//             state.token = null
//             removeCookie('token')
//         }

//     },
//     actions: {
//         async login({ commit }, details) {
//             const { email, password } = details

//             commit('SET_USER', auth.currentUser)

//             router.push('/')
//         },
//         async register({ commit }, details) {
//             const { email, password } = details

//             commit('SET_USER', auth.currentUser)
//             commit('SET_TOKEN', auth.currentUser)

//             router.push('/')
//         },
//         async logout ({ commit }) {
//             await signOut(auth)

//             commit('CLEAR_USER')
//             commit('CLEAR_TOKEN')
//             router.push('/login')
//           },

//           fetchUser ({ commit }) {
//             auth.onAuthStateChanged(async user => {
//               if (user === null) {
//                 commit('CLEAR_USER')
//               } else {
//                 commit('SET_USER', user)

//                 if (router.currentRoute.value.path === '/login') {
//                   router.push('/')
//                 }
//               }
//             })
//           }

//         }
//       })

export default createStore({
    state: {
        token: getCookie("token"),
        user: null,
    } as { token: string | null; user: Consumer | Producer | null; auth: boolean },
    mutations: {
        /*
        SET_USER(state, user: Consumer | Producer) {
            state.user = user;
            for (const key in user) {
                if (Object.hasOwn(user, key)) {
                    state.user[key] = user[key];
                }
            }
        },
*/
        SET_USER (state, user: Consumer | Producer) {
          state.user = user;          
        },
        CLEAR_USER(state) {
            state.user = null;
        },
        SET_TOKEN(state, token: string) {
            state.token = token;
            setCookie("token", token, 7);
        },
        REMOVE_TOKEN(state) {
            state.token = null;
            removeCookie("token");
        },
    },
    actions: {

        async login({ commit }, details) {
            const { email, password } = details;

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("User not found");
                        break;
                    case "auth/wrong-password":
                        alert("Wrong password");
                        break;
                    default:
                        alert("Something went wrong");
                }

                return;
            }

            
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                // .then(async (userCredential) => {
                // Save the authentication token to local storage
                const authToken = userCredential.user.getIdToken();
                localStorage.setItem("authToken", await authToken);
                // commit using SET_TOKEN using authToken, uid, email
                commit("SET_TOKEN", await authToken);
                saveUser(auth.currentUser?.uid);
                saveEmail(auth.currentUser?.email);
                console.log("authToken: ", authToken);
                console.log("user", auth.currentUser);
                // })
            } catch (error) {
                // .catch((error) => {
                // Handle errors
                console.error(error);
                // });
            }

            commit("SET_USER", auth.currentUser?.uid);

            // auth.onIdTokenChanged((user) => {
            //     if (user) {
            //       // User logged in already or has just logged in.
            //       saveUser(user.uid)
            //     } else {
            //       // User not logged in or has just logged out.
            //     }
            //   });
            router.push("/");
        },


  
        // async register ({ commit}, details: {name: string, password: string, email: string, phone: string, vat: string}) {
        async register(
            { commit },
            details: {
                name: string;
                password: string;
                email: string;
                phone: string;
                vat: string;
                number: number;
                door: string;
                floor: number;
                zip_code: string;
                street: string;
                parish: string;
                county: string;
                city: string;
                district: string;
                latitude: number;
                longitude: number;
                type: string;
            },
        ) {
            // const { email, password, name, phone, vat } = details
            const {
                email,
                password,
                name,
                phone,
                vat,
                number,
                door,
                floor,
                zip_code,
                street,
                parish,
                county,
                city,
                district,
                latitude,
                longitude,
                type,
            } = details;

            // try {
            //     await createUserWithEmailAndPassword(auth, email, password);

            //     commit("SET_TOKEN", await auth.currentUser?.getIdToken());

            //     const userType = Registration.setup().getUserType();
            //     console.log("userType_index: ", userType);

                // if (userType == "Consumer") {
                //     try {
                //         // await postConsumer({ name, phone, vat });
                //         await postConsumer({ phone, vat });
                
                //         const authArray = await fetchAuth();
                //         const { id } = authArray.data;
                //         await postAddressConsumer(id, {
                //             number,
                //             door,
                //             floor,
                //             zipCode: zip_code,
                //             street,
                //             parish,
                //             county,
                //             city,
                //             district,
                //             latitude,
                //             longitude,
                //         });
                
                //         console.log("Im in Consumer");
                //         commit("SET_USER", authArray);
                //     } catch (error) {
                //         console.error(error);
                //         alert("Something went wrong while creating the consumer");
                //     }
                // }
                // // if saveValue == "Producer" then post to producer collection
                // else if (userType == "Producer") {
                //     try {
                //         await postProducer({ name, phone, vat });
                //         console.log("Im in Producer");
                //     } catch (error) {
                //         console.error(error);
                //         alert("Something went wrong while creating the producer");
                //     }
                // }
                
                // router.push("/");
                //////////////////////////////
        //         try {
        //             const userType = Registration.setup().getUserType();
        //             console.log("userType_index: ", userType);
                  
        //             if (userType == "Consumer") {
        //               try {
                        
                        
                        
        //                 await createUserWithEmailAndPassword(auth, email, password);
        //                 commit("SET_TOKEN", await auth.currentUser?.getIdToken());
        //                 await postConsumer({ name, phone, vat });
                        
        //                 const authArray = await fetchAuth();
                        
                        
        //                 const { id } = authArray.data;
        //                 await postAddressConsumer(id, {
        //                   number,
        //                   door,
        //                   floor,
        //                   zipCode: zip_code,
        //                   street,
        //                   parish,
        //                   county,
        //                   city,
        //                   district,
        //                   latitude,
        //                   longitude,
        //                 });
                  
        //                 console.log("Im in Consumer");
        //                 commit("SET_USER", authArray);
        //                 router.push("/");
                  
        //             } catch (error) {
        //                 switch (error.code) {
        //                     case "auth/email-already-in-use":
        //                         alert("Email already in use");
        //                         break;
        //                     case "auth/invalid-email":
        //                         alert("Invalid email");
        //                         break;
        //                     case "auth/operation-not-allowed":
        //                         alert("Operation not allowed");
        //                         break;
        //                     case "auth/weak-password":
        //                         alert("Weak password");
        //                         break;
        //                     default:
        //                         alert("Something went wrong");
        //                         if (auth.currentUser) {
        //                             deleteUser(auth.currentUser)       
        //                         }
        //                 }
        //             }
        //             }
        //             // if saveValue == "Producer" then post to producer collection
        //             else if (userType == "Producer") {
        //               try {
                        
        //                 console.log("Im in Producer");
                  
        //                 // Create user after data is successfully posted
        //                 await createUserWithEmailAndPassword(auth, email, password);
                  
        //                 commit("SET_TOKEN", await auth.currentUser?.getIdToken());
        //                 await postProducer({ name, phone, vat });
        //                 router.push("/");
        //             } catch (error) {
        //                 switch (error.code) {
        //                     case "auth/email-already-in-use":
        //                         alert("Email already in use");
        //                         break;
        //                     case "auth/invalid-email":
        //                         alert("Invalid email");
        //                         break;
        //                     case "auth/operation-not-allowed":
        //                         alert("Operation not allowed");
        //                         break;
        //                     case "auth/weak-password":
        //                         alert("Weak password");
        //                         break;
        //                     default:
        //                         alert("Something went wrong");
        //                         if (auth.currentUser) {
        //                             deleteUser(auth.currentUser)       
        //                         }
        //                 }
        //             }
        //             }
                  
                    
                  
                  
                  
        //     } catch (error) {
        //         switch (error.code) {
        //             case "auth/email-already-in-use":
        //                 alert("Email already in use");
        //                 break;
        //             case "auth/invalid-email":
        //                 alert("Invalid email");
        //                 break;
        //             case "auth/operation-not-allowed":
        //                 alert("Operation not allowed");
        //                 break;
        //             case "auth/weak-password":
        //                 alert("Weak password");
        //                 break;
        //             default:
        //                 alert("Something went wrong");
        //                 if (auth.currentUser) {
        //                     deleteUser(auth.currentUser)       
        //                 }
        //         }
        //     }
        // },
////////////////////////
try {
    // const userType = Registration.setup().getUserType();

    console.log("userType_index: ", type);
                    
    if (type == "Consumer") {
      try {
        // Post consumer address
        const authArray = await fetchAuth();
        const { id } = authArray.data;
        await postAddressConsumer(id, {
          number,
          door,
          floor,
          zipCode: zip_code,
          street,
          parish,
          county,
          city,
          district,
          latitude,
          longitude,
        });
        
        // Create user after address is successfully posted
        await createUserWithEmailAndPassword(auth, email, password);
        commit("SET_TOKEN", await auth.currentUser?.getIdToken());
  
        // Post consumer data
        await postConsumer({ name, phone, vat });
        console.log("Im in Consumer");
        commit("SET_USER", authArray);
        router.push("/");
      } catch (error) {
        // Handle error for address or user creation
        switch (error.code) {
          // Handle different error codes as needed
          default:
            alert("Something went wrong");
            if (auth.currentUser) {
              deleteUser(auth.currentUser)       
            }
        }
      }
    }
    // if saveValue == "Producer" then post to producer collection
    else if (type == "Producer") {
      try {
        console.log("Im in Producer");
  
        // Create user after data is successfully posted
        await createUserWithEmailAndPassword(auth, email, password);
        commit("SET_TOKEN", await auth.currentUser?.getIdToken());
  
        // Post producer data
        await postProducer({ name, phone, vat });
        router.push("/");
      } catch (error) {
        // Handle error for user creation or producer data post
        switch (error.code) {
          // Handle different error codes as needed
          default:
            alert("Something went wrong");
            if (auth.currentUser) {
              deleteUser(auth.currentUser)       
            }
        }
      }
    }
  } catch (error) {
    // Handle error for getting user type
    switch (error.code) {
      // Handle different error codes as needed
      default:
        alert("Something went wrong");
        if (auth.currentUser) {
          deleteUser(auth.currentUser)       
        }
    }
  }
},

        async logout({ commit }) {
            await signOut(auth);

            commit("CLEAR_USER");
            commit("REMOVE_TOKEN");
            router.push("/login");
        },

        fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
                if (user === null) {
                    commit("CLEAR_USER");
                } else {
                    commit("SET_USER", user);

                    if (router.currentRoute.value.path === "/login") {
                        router.push("/");
                    }
                }
            });
        },
    },
});
