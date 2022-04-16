// CORE MODULE

// File System
const fs = require('fs');
// console.log(fs);
const readline = require('readline');
// console.log(readline);

// -Synchronous
// fs.writeFileSync('test.txt', 'Hello World by Synchronous.'); // create new file test.txt with the string param
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World by Synchronous.'); // will Error if folder data doesn't exists folder data in current dir
// } catch (errors, results) {
//     console.log(errors, results);
// }

// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// -Asynchronous
// fs.writeFile('data/test.txt', 'Hello World by Asynchronous', (errors, results) => {
//     console.log(errors, results);
// });

// const data = fs.readFile('data/test.txt', 'utf-8', (errors, results) => {
//     if (errors) throw errors
//     const result = {errors, results};
//     console.log(result);
//     b = result;
//     return result;
// });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Your name? ', (answer1) => {
    // TODO: Log the answer in a database
    rl.question('Your phone number? ', (answer2) => {
        // TODO: Log the answer in a database
        console.log(`Name: ${answer1}\nPhone: ${answer2}`);
        const contact = {
            name: answer1,
            phone: answer2
        };
        const contactsExists = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(contactsExists);
        contacts.push(contact) // add new contact to Existing Contact
        fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), (errors, results) => {
            if (errors) {
                console.log(errors, results);
            }
        });
        rl.close();
    });
});