// File System
const fs = require('fs');

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

// load contact
const loadContacts = () => {
    const contactsExists = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsExists);
    return contacts;
}
// find contact
const findContact = (email) => {
    const contacts = loadContacts();
    const contact = contacts.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (contact === undefined) {
        return null;
    }

    return contact;
}

module.exports = { loadContacts, findContact };