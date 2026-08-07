// Firebase is not actively used on this site.
// Safe stubs are exported below to avoid browser console errors or unnecessary network requests.

export const app = null;
export const db = null;
export const auth = null;
export const googleProvider = null;

export const signInWithPopup = async () => {};
export const signOut = async () => {};
export const onAuthStateChanged = (authObj, callback) => {
  if (typeof callback === "function") callback(null);
  return () => {};
};
export const createUserWithEmailAndPassword = async () => {};
export const signInWithEmailAndPassword = async () => {};
export const sendPasswordResetEmail = async () => {};
export const updateProfile = async () => {};
export const doc = () => {};
export const setDoc = async () => {};
export const getDoc = async () => ({ exists: () => false, data: () => null });
export const updateDoc = async () => {};
export const arrayUnion = () => {};
export const arrayRemove = () => {};
