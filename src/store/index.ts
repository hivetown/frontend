import { createStore } from 'vuex'
import {createApp} from "vue";
import PrimeVue from "primevue/config";

import router from "../router";
import { auth } from '../components/firebase';

import { postConsumer } from '../api/consumers';

import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth"; 


import { getCookie, setCookie, removeCookie } from './cookies'

import firebase from 'firebase/app';



const saveUser = (uid) => {
  // add new user to database
    localStorage.setItem('uid', uid)
    console.log(uid)
}

const saveEmail = (email) => {
    localStorage.setItem('email', email)
    console.log(email)
}

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
        token: getCookie('token'),
        user: {
            id: 0,
            name: '',
            phone: '',
            email: '',
        }
    },
    mutations: {
  
      SET_USER (state, user) {
        state.user = user
        for (const key in user) {
                state.user[key] = user[key]
            }  
      },
  
      CLEAR_USER (state) {
        state.user = null
      },
      SET_TOKEN (state, token) {
        state.token = token
        setCookie('token', token, 7)
      },
      REMOVE_TOKEN (state) {
        state.token = null
        removeCookie('token')
      }  
    },
    actions: {
      async login ({ commit }, details) {
        const { email, password } = details
  
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
          switch(error.code) {
            case 'auth/user-not-found':
              alert("User not found")
              break
            case 'auth/wrong-password':
              alert("Wrong password")
              break
            default:
              alert("Something went wrong")
          }
  
          return
        }
  
        // commit('SET_USER', auth.currentUser)
        // commit('SET_USER', details.user)
        // commit('SET_TOKEN', details.token)






        // saveToken(details.token)
        // saveUser(details.user)
        // saveToken(auth.currentUser?.getIdTokenResult())
        // save accessToken that is in auth.currentUser
        // saveUser(auth.currentUser)
        
        // saveToken(auth.currentUser?.getIdTokenResult())
        // saveUser(auth.currentUser?.uid)
        // saveEmail(auth.currentUser?.email)


        //once the Promise has resolved, you should extract the authentication token from the user object and store it in local storage as a string. This string can be used to authenticate future requests to Firebase services.
        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Save the authentication token to local storage
            const authToken = userCredential.user.getIdToken();
            localStorage.setItem('authToken', await authToken);
            // commit using SET_TOKEN using authToken, uid, email
            commit('SET_TOKEN', await authToken)
            saveUser(auth.currentUser?.uid)
            saveEmail(auth.currentUser?.email)
            console.log("authToken: ", authToken);
            console.log("user" , auth.currentUser)
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
          });
        
        
          commit('SET_USER', auth.currentUser?.uid)
          
          
        
        
        
        // auth.onIdTokenChanged((user) => {
        //     if (user) {
        //       // User logged in already or has just logged in.
        //       saveUser(user.uid)
        //     } else {
        //       // User not logged in or has just logged out.
        //     }
        //   });
        router.push('/')
      },
  
      async register ({ commit}, details: {name: string, password: string, email: string, phone: string, vat: string}) {
         const { email, password, name, phone, vat } = details
         
  
        try {
          await createUserWithEmailAndPassword(auth, email, password)

               
          
          commit('SET_TOKEN', await auth.currentUser?.getIdToken())
          

          postConsumer({ name, phone, vat })
          
          
          
        } catch (error) {
          switch(error.code) {
            case 'auth/email-already-in-use':
              alert("Email already in use")
              break
            case 'auth/invalid-email':
              alert("Invalid email")
              break
            case 'auth/operation-not-allowed':
              alert("Operation not allowed")
              break
            case 'auth/weak-password':
              alert("Weak password")
              break
            default:
              alert("Something went wrong")
              // delete user from firebase if exists
              //if (auth.currentUser) {
                // auth.currentUser.delete()
                // db.collection("users").document(FirebaseAuth.getInstance().getCurrentUser().getUid()).delete();
                //deleteUser(auth.currentUser?.uid)
              //}
          }
          
          return
        }
  
        commit('SET_USER', auth.currentUser)
  
        router.push('/')
      },
  
      async logout ({ commit }) {
        await signOut(auth)
  
        commit('CLEAR_USER')
        commit('REMOVE_TOKEN')
        router.push('/login')
      },
  
      fetchUser ({ commit }) {
        auth.onAuthStateChanged(async user => {
          if (user === null) {
            commit('CLEAR_USER')
          } else {
            commit('SET_USER', user)
  
            if (router.currentRoute.value.path === '/login') {
              router.push('/')
            }
          }
        })
      }
      
    }
  })
