// AMBIL DATA
import {
  getDocs,
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";

import bcrypt from "bcrypt";
const firestore = getFirestore(app);

// Terima Data
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
// Terima Data per ID
export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

// Register
export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string; //Opsional menggunakan ?
}) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: "Email Still Exist!" };
  } else {
    data.role = "admin";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      // Upload ke FireStore
      await addDoc(collection(firestore, "users"), data);

      return { status: true, statusCode: 200, message: "Berhasil Register" };
    } catch (error) {
      return { status: false, statusCode: 400, message: "Register Gagal" };
    }
  }
}
