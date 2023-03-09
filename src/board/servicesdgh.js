import { db } from "../interceptors/firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// db=firestore instance of our application
// books=name of collection
const bookCollectionRef = collection(db, "books");
class LocationDataServices {
  addBooks = (newBook) => {
    return addDoc(collection(db, localStorage.getItem("gameId")), newBook);
  }

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, localStorage.getItem("gameId"), id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, localStorage.getItem("gameId"), id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(collection(db, localStorage.getItem("gameId")));
  };

  getBook = (id) => {
    const bookDoc = doc(db, localStorage.getItem("gameId"), id);
    return getDoc(bookDoc);
  };
}

export default new LocationDataServices();

