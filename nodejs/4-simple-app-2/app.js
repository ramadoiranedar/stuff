const yargs = require('yargs');
const contacts = require('./contacts');

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
yargs.parse();