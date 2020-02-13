import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  firebase.initializeApp(firebaseConfig);
  
  const database =  firebase.database();
  
  database.ref().set({
      name: 'Ankit Boghra',
      age: 23,
      location: {
        city: 'Surat',
        country: 'India'
      }
  })
  .then(() => {
    console.log('Data saved successfully!');
  })
  .catch((e) => {
    console.log('Something went wrong! ', e);
  })
  ;
  
  database.ref('location/city').set('Bangalore');
  
  database.ref('attributes').set({
    height: 5.8,
    weight: 69.9
  })
  .then(() => {
    console.log('Data updated successfully!');
  })
  .catch((e) => {
    console.log('Something went wrong while updating! ', e);
  });
