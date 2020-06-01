import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCGloa_qLd4Ro1Yqwpuxs_fY8HM1QaB9jM",
  authDomain: "crwn-db-91457.firebaseapp.com",
  databaseURL: "https://crwn-db-91457.firebaseio.com",
  projectId: "crwn-db-91457",
  storageBucket: "crwn-db-91457.appspot.com",
  messagingSenderId: "243449365182",
  appId: "1:243449365182:web:87e5a6c9d7a74bd6f514ef",
  measurementId: "G-WX1ZD7FKBT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const updateFirestoreCartItems = (user, cartItems) => {
  firestore.collection('carts').doc(user.id).set({
    items: cartItems
  })
}

export const getUserCartData = async (id) => {
  const cartRef = firestore.collection('carts').doc(id);
  const cartSnapshot = await cartRef.get();

  if (!cartSnapshot.exists) {
    firestore.collection('carts').doc(id).set({
      items: []
    })

    return [];
  }

  const { items } = cartSnapshot.data();

  return items;
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
