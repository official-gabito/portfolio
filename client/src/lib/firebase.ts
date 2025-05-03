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
  apiKey: "AIzaSyAUNYFRXsClJe2bfiJ_IDWbHpVM14u-8WE",
  authDomain: "html-6aa97.firebaseapp.com",
  projectId: "html-6aa97",
  storageBucket: "html-6aa97.appspot.com",
  messagingSenderId: "29341518763",
  appId: "1:29341518763:web:fd103ec55acf4a8f4120ee",
  measurementId: "G-SSF5C4DK0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// CONTACT MESSAGES

export interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  subject: string;
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

// APPOINTMENTS

export interface AppointmentData {
  fullName: string;
  email: string;
  preferredDate: Date | null;
  time: Date | null;
  topic: string;
  dateFormatted: string;
  timeFormatted: string;
}

export const scheduleAppointment = async (data: AppointmentData) => {
  try {
    // Add a timestamp to the data
    const appointmentWithTimestamp = {
      ...data,
      createdAt: serverTimestamp()
    };
    
    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'appointments'), appointmentWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    throw new Error('Failed to schedule appointment');
  }
};

export const getAppointments = async () => {
  try {
    // Get documents from Firestore, ordered by createdAt (newest first)
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
    
    return appointments;
  } catch (error) {
    console.error("Error getting appointments:", error);
    throw new Error('Failed to get appointments');
  }
};

// ORDERS

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  references?: string;
  additionalInfo?: string;
  planId: string;
  planName: string;
}

export const submitOrder = async (data: OrderData) => {
  try {
    // Add a timestamp to the data
    const orderWithTimestamp = {
      ...data,
      createdAt: serverTimestamp()
    };
    
    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw new Error('Failed to submit order');
  }
};

export const getOrders = async () => {
  try {
    // Get documents from Firestore, ordered by createdAt (newest first)
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
    
    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error('Failed to get orders');
  }
};

// STORAGE

export const getFileUrl = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw new Error('Failed to get file URL');
  }
};
