//
// Object destructuring
//

const person = {
    name: 'Ankit',
    age: 23,
    location: {
        city: 'Surat',
        temp: 20
    }
}

const {
    name = 'Anonymous',
    age,
} = person;

const {
    city,
    temp: temprature 
} = person.location;
console.log(`Name: ${name}, age: ${age}, location: ${city}, temprature: ${temprature}`);

//
// Array destructuring
//

const sentence = ['hello world', 'this is', 'Ankit' ];
const [greeting, , names = 'anonymous'] = sentence;

console.log(`Welcome ${names}!! ${greeting}`);
