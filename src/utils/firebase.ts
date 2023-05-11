import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCNHKruNzyveATq_SXnKR_iT5s3wIPIBwg',
    authDomain: 'hive-town-auth.firebaseapp.com',
    projectId: 'hive-town-auth',
    storageBucket: 'hive-town-auth.appspot.com',
    messagingSenderId: '984328749354',
    appId: '1:984328749354:web:cf4ad1a3c0e4efd2821e53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
