// File System
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// UTILS
function textDanger(text) {
    return chalk.red.inverse.bold(text);
}
function textSuccess(text) {
    return chalk.green.inverse.bold(text);
}
function textPrimary(text) {
    return chalk.blue.inverse.bold(text);
}

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

// add contact
const addContact = (name, email, phone) => {
    const contact = { name, email, phone };
    const contactsExists = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsExists);

    // check is empty
    if (name === '' || email === '' || phone === '') {
        console.log(textDanger('All fields is required'));
        return false;
    }

    // check valid email
    if (!validator.isEmail(email)) {
        console.log(textDanger('Email is invalid'));
        return false;
    }

    // check unique email
    const isUniqueEmail = contacts.find((contact) => contact.name === name);
    if (isUniqueEmail) {
        console.log(textDanger('Email is already registered'));
        return false;
    }

    // check
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log(textDanger('Phone number is invalid'));
        return false;
    }
    contacts.push(contact) // add new contact to Existing Contact
    fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), (errors, results) => {
        if (errors) console.log(errors, results);
    });
    console.log(textSuccess('Successfull added new contact.'));
};

// list contact
const listContact = () => {
    const contacts = loadContacts();
    console.log(textPrimary('List Contacts: '));
    contacts.forEach((contact,index) => {
        console.log(`${index + 1}. ${contact.name} \t ${contact.phone}`);
    });
};

// detail contact
const detailContact = (email) => {
    const contacts = loadContacts();

    const contact = contacts.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!contact) {
        console.log(textDanger(`This email "${email}" is not Found`));
        return false;
    }

    console.log(`Detail of ${textPrimary(contact.email)}\nName: ${contact.name}\nPhone: ${contact.phone}\n`);
};

// delete contact
const deleteContact = (email) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter(c => c.email.toLowerCase() !== email.toLowerCase());
    
    if (contacts.length === newContacts.length) {
        console.log(textDanger(`${email} is not found`));
        return false;
    }
    fs.writeFile('data/contacts.json', JSON.stringify(newContacts, null, 2), (errors, results) => {
        if (errors) console.log(errors, results);
    });
    console.log(textSuccess(`Successfull delete this "${email}" contact`));
};

module.exports = { addContact, listContact, detailContact, deleteContact }; // exports module
