/* global XMLHttpRequest:false */
import * as firebase from "firebase";

function getOwnUser() {
  return firebase.auth().currentUser;
}

function getUser(uid) {
  return firebase
    .database()
    .ref(`/users/${uid}`)
    .once("value")
    .then(snapshot => snapshot);
}

function seekUserMail(userInput) {
  return firebase
    .database()
    .ref("users")
    .once("value")
    .then(snapshot => {
      let res = false;
      let contactUID = null;

      snapshot.forEach(userID => {
        if (userInput === userID.child("email").val()) {
          res = true;
          contactUID = userID.key;
        }
      });
      return { exists: res, uid: contactUID };
    });
}

function myDate() {
  function padding(n) {
    if (n <= 9) return `0${n}`;
    return n;
  }

  const d = new Date();
  return `${d.getFullYear()}/${padding(d.getMonth())}/${padding(
    d.getDate()
  )} ${padding(d.getHours())}:${padding(d.getMinutes())}`;
}

function createPayment(paymentAmount, receiverSnapshot, receiverUid) {
  const payerUid = firebase.auth().currentUser.uid;

  const transactionID = firebase
    .database()
    .ref()
    .child("transactions")
    .push().key;

  return getUser(payerUid).then(payerSnapshot => {
    const updates = {};
    const date = myDate();

    updates[`/transactions/${payerUid}/${transactionID}`] = {
      target: receiverSnapshot.val().email,
      amount: paymentAmount,
      transactionType: "debit",
      date
    };
    updates[`/transactions/${receiverUid}/${transactionID}`] = {
      target: payerSnapshot.val().email,
      amount: paymentAmount,
      transactionType: "credit",
      date
    };

    updates[`/users/${payerUid}`] = {
      email: payerSnapshot.val().email,
      firstname: payerSnapshot.val().firstname,
      lastname: payerSnapshot.val().lastname,
      walletAmount: payerSnapshot.val().walletAmount - paymentAmount
    };
    updates[`/users/${receiverUid}`] = {
      email: receiverSnapshot.val().email,
      firstname: receiverSnapshot.val().firstname,
      lastname: receiverSnapshot.val().lastname,
      walletAmount: receiverSnapshot.val().walletAmount + paymentAmount
    };
    return firebase
      .database()
      .ref()
      .update(updates, error => error);
  });
}

function createUserEntry(uid, email, firstname, lastname) {
  firebase
    .database()
    .ref(`/users/${uid}`)
    .set({
      walletAmount: 100,
      email,
      firstname,
      lastname
    });
}

const UploadImage = async (uri, imageFileName) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const { uid } = firebase.auth().currentUser;

  const ref = firebase
    .storage()
    .ref()
    .child(`photo_profile/${uid}/${imageFileName}`);

  await ref.put(blob);
  return ref.getDownloadURL();
};

function getHistory() {
  const { uid } = firebase.auth().currentUser;

  return firebase
    .database()
    .ref(`/transactions/${uid}`)
    .once("value")
    .then(snapshot => snapshot);
}

export {
  getUser,
  getOwnUser,
  getHistory,
  seekUserMail,
  createPayment,
  createUserEntry,
  UploadImage
};
