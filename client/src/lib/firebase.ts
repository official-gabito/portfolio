import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  orderBy, 
  query,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDEj0aPyAyigb44g1VDreGNm_JfZYSBc5M",
  authDomain: "gabriel-portfolio-77232.firebaseapp.com",
  projectId: "gabriel-portfolio-77232",
  storageBucket: "gabriel-portfolio-77232.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:123456789abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
}

export const sendContactMessage = async (data: ContactMessageData) => {
  try {
    // Add a timestamp to the data
    const messageWithTimestamp = {
      ...data,
      createdAt: serverTimestamp()
    };
    
    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'contactMessages'), messageWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw new Error('Failed to send message');
  }
};

export const getContactMessages = async () => {
  try {
    // Get documents from Firestore, ordered by createdAt (newest first)
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
    
    return messages;
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw new Error('Failed to get messages');
  }
};

export const deleteContactMessage = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'contactMessages', id));
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw new Error('Failed to delete message');
  }
};

export const getFileUrl = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw new Error('Failed to get file URL');
  }
};
