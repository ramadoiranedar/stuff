// File System
const fs = require('fs');
const { resolve } = require('path');
// console.log(fs);
const readline = require('readline');
// console.log(readline);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// create folder
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// create file
const filePath = dirPath + '/contacts.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

// question
const q = (question) => new Promise((resolve, reject) => {
    rl.question(question, (answer) => resolve(answer));
});

// add contact
const addContact = (name, email, phone) => {
    const contact = { name, email, phone };
    const contactsExists = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsExists);
    contacts.push(contact) // add new contact to Existing Contact
    fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), (errors, results) => {
        if (errors) console.log(errors, results);
    });
    rl.close();
};

module.exports = {q, addContact}; // exports module
