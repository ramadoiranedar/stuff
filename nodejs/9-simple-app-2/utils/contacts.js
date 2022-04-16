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
};

// find contact
const findContact = (email) => {
    const contacts = loadContacts();
    const contact = contacts.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (contact === undefined) {
        return null;
    }

    return contact;
};

// add contact
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2), 'utf-8');
};

const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    saveContacts(contacts);
};

const checkDuplicate = (email) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.email === email);
};

const checkEmpty = (value) => {
    return (value === '');
};

module.exports = { loadContacts, findContact, addContact, checkDuplicate, checkEmpty };