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
      isSingle: true,
      job: 'Software Developer',
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
  
  // Updating data
  database.ref('location/city').set('Bangalore');
  
  database.ref('attributes')
    .set({
      height: 5.8,
      weight: 69.9
    })
    .then(() => {
      console.log('Data updated successfully!');
    })
    .catch((e) => {
      console.log('Something went wrong while updating! ', e);
  });
  
  // Removing data, Way 1
  database.ref('isSingel')
    .remove()
    .then(()=> {
      console.log('Data removed successfully!');
    })
    .catch((e_ => {
      console.log('Something went wrong while removing data!');
  }));
  
  // Removing data, Way 2
  
  database.ref('age').set(null);
  
  // Updating or deleting or adding data
  database.ref().update({
    name: 'Ankit B',
    age: 22,
    isSingle: null,
    'location/city': 'Bengaluru'
  });
  
  // Fetching data, Way 1
  database.ref().once('value')
    .then((snapshot) => {
      const val = snapshot.val();
      console.log(val);
    })
    .catch((e) => {
      console.log('Some thing went wrong while fetching data!')
    });
  
  
  // Fetching data, Way 1
  
  const onValueChange = database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
  });
  
  setTimeout(() => {
    database.ref().off('value', onValueChange);
  }, 3500);


// Working with arrays/list of data
// Since firebase do not support array

// Clearing data
database.ref().set(null); 

database.ref('expenses').push({
  description: 'For the month of January',
  note: 'Rent',
  amount: 12500,
  createdAt: 123456
});

database.ref('expenses').push({
  description: 'For Dad',
  note: 'Mobile Recharge',
  amount: 699,
  createdAt: 456789
});

database.ref('expenses').push({
  description: 'iPhone 6s',
  note: 'Phone',
  amount: 60000,
  createdAt: 789456
});

// Fetching the list of data

// Way 1, by value
database.ref('expenses').once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  })
  .catch((e) => {
    console.log('Something went wrong while fetching data, ', e);
  });

  // Fetching data with subscription
  database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];
  
    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
  
    console.log('Hello');
  });

// Way 2, by child_removed
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log('Expense deleted', snapshot.key, snapshot.val());
});

// Way 3. by child_changed
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log('Expense modified', snapshot.key, snapshot.val());
});

// Way 4. by child_added
database.ref('expenses').on('child_added', (snapshot) => {
  console.log('Expense added', snapshot.key, snapshot.val());
});
