import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import app from './config';

const db = getFirestore(app);

// Learning session operations
export const saveLearningSession = async (userId, sessionData) => {
  try {
    const sessionWithTimestamp = {
      ...sessionData,
      userId,
      createdAt: serverTimestamp(),
      title: sessionData.title || 'Untitled Session',
    };
    const docRef = await addDoc(collection(db, 'learningSessions'), sessionWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error saving learning session:', error);
    throw error;
  }
};

export const getLearningSessions = async (userId) => {
  try {
    const q = query(
      collection(db, 'learningSessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));
  } catch (error) {
    console.error('Error getting learning sessions:', error);
    throw error;
  }
};

export const getLearningSession = async (sessionId) => {
  try {
    const docRef = doc(db, 'learningSessions', sessionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting learning session:', error);
    throw error;
  }
};

export const deleteLearningSession = async (sessionId) => {
  try {
    await deleteDoc(doc(db, 'learningSessions', sessionId));
  } catch (error) {
    console.error('Error deleting learning session:', error);
    throw error;
  }
};

// Flashcard operations
export const addFlashcard = async (flashcard) => {
  try {
    const docRef = await addDoc(collection(db, 'flashcards'), flashcard);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getFlashcards = async (userId) => {
  try {
    const q = query(
      collection(db, 'flashcards'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

export const getFlashcard = async (id) => {
  try {
    const docRef = doc(db, 'flashcards', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateFlashcard = async (id, data) => {
  try {
    const docRef = doc(db, 'flashcards', id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const deleteFlashcard = async (id) => {
  try {
    const docRef = doc(db, 'flashcards', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// Study session operations
export const addStudySession = async (session) => {
  try {
    const docRef = await addDoc(collection(db, 'studySessions'), session);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getStudySessions = async (userId) => {
  try {
    const q = query(
      collection(db, 'studySessions'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

export default db; 