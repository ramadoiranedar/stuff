const yargs = require('yargs');
const contacts = require('./contacts');

// add contact
yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Your name?',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Your email?',
            demandOption: true,
            type: 'string'
        },
        phone: {
            describe: 'Your phone?',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // const contact = {
        //     name: argv.name,
        //     email: argv.email,
        //     phone: argv.phone,
        // };
        // console.log(contact);
        contacts.addContact(argv.name, argv.email, argv.phone);
        
    }
});

// show list data
yargs.command({
    command: 'list',
    describe: 'Show list contact',
    handler() {
        contacts.listContact();
    }
})

// detail contact
yargs.command({
    command: 'detail',
    describe: 'Show detail contact',
    builder: {
        email: {
            describe: 'Email contact',
            demandCommand: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.detailContact(argv.email);
    },
});

// delete contact based on email
yargs.command({
    command: 'delete',
    describe: 'Delete contact based on email',
    builder: {
        email: {
            describe: 'Email contact',
            demandCommand: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.email);
    },
});

yargs.parse();