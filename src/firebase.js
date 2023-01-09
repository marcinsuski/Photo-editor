import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';


      

const firebaseConfig = {
    apiKey: "AIzaSyDqvGfafCVBXlDU6hgnYEOY3j-B-CUHbGY",
    authDomain: "uploadingimage-cb609.firebaseapp.com",
    projectId: "uploadingimage-cb609",
    storageBucket: "uploadingimage-cb609.appspot.com",
    messagingSenderId: "336502874182",
    appId: "1:336502874182:web:31a5473d781b89ac392a47"
  };
  



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);