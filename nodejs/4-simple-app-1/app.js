const { q, addContact } = require('./contacts');

const main = async () => {
    const name = await q('Your name? ');
    const email = await q('Your email? ');
    const phone = await q('Your phone? ');

    addContact(name, email, phone);
};

main(); // main app