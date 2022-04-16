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

module.exports = {addContact}; // exports module
