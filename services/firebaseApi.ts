import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const updateSearchCount = async (query: string, movie: Movie) => {
  if (!query) return;

  if (!movie) {
    console.warn(
      "No movie data available to update search count for query:",
      query,
    );
    return;
  }

  try {
    // Use search term as document ID (lowercase to avoid duplicates)
    const searchRef = doc(db, "searches", query.toLowerCase());

    await setDoc(
      searchRef,
      {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }, // creates if not exists, updates if exists
    );

    console.log("Search count updated successfully");
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTopSearches = async () => {
  const q = query(
    collection(db, "searches"),
    orderBy("count", "desc"),
    limit(5),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};

// //track the serched made by a user

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   //check if a record of that search already exists in the database
//   //if a document is found increment the search count by 1
//   //if no document is found create a new document with search count set to 1
// };
