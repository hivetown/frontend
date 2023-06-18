import { config } from '@/config';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = config.firebase;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
