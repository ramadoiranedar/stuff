const express = require('express')
const expressLayouts = require('express-ejs-layouts') // ejs layouts 1
const { loadContacts, findContact, addContact, checkDuplicate, checkEmpty, deleteContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const PORT = 3000

// Set View Engine - EJS
app.set('view engine', 'ejs');

// Third-party middleware
app.use(expressLayouts) // ejs layouts 2
 
// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Setup FLASH
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(flash());

// root
app.get('/', (req, res) => {
    const title = 'Index pages';
    const students = [
        {
            id: 1,
            name: 'Dendi pudge'
        },
        {
            id: 2,
            name: 'Dendi puck'
        },
        {
            id: 3,
            name: 'Dendi invoker'
        },
    ];
    res.render('index', { 
        title,
        layout: 'layouts/main-layout', // ejs layouts 3
        name: 'Ramadoiranedar',
        students
    });
})

app.get('/about', (req, res) => {
    const title = 'About pages';
    res.render('about', {
        title,
        layout: 'layouts/main-layout' // ejs layouts 3
    });
})  

app.get('/contact', (req, res) => {
    const title = 'Contact pages';
    const contacts = loadContacts();
    res.render('contact', {
        title,
        contacts,
        layout: 'layouts/main-layout', // ejs layouts 3
        msg: req.flash('msg'),
    });
})

app.get('/contact/add', (req, res) => { 
    const title = 'Add Contact';
    res.render('add-contact', {
        title,
        layout: 'layouts/main-layout', // ejs layouts 3
    });
})

app.post('/contact', 
    [
        check('name')
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Name is required')
                }
                return true; // required for exit after custom throw
            }),
        body('email')
            .custom((value, { req }) => {
                const isDuplicate = checkDuplicate(value);
                if (isDuplicate) {
                    throw new Error('Email is already used')
                }
                return true; // required for exit after custom throw
            })
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Email is required')
                }
                return true; // required for exit after custom throw
            })
            .isEmail().withMessage('Email is invalid'),
        check('phone', 'Phone number is invalid')
            .isMobilePhone('id-ID')
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Phone is required')
                }
                return true; // required for exit after custom throw
            })
    ],
    (req, res) => { // MAKE SURE THIS CODE BEFORE MIDDLEWARE '/contact/:email'
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('add-contact', {
                title: 'Add Contact',
                layout: 'layouts/main-layout',
                errors: errors.array()
            });
        } else {
            const dataForm = req.body;
            addContact(dataForm);
            req.flash('msg', 'New data contact successfully added');
            res.redirect('/contact');
        }
    }
)

app.get('/contact/edit/:email', (req, res) => { 
    const title = 'Edit Contact';
    const contact = findContact(req.params.email);

    res.render('edit-contact', {
        title,
        layout: 'layouts/main-layout', // ejs layouts 3
        contact
    });
});

// res.send(req.body);
app.post('/contact/update', 
    [
        check('name')
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Name is required')
                }
                return true; // required for exit after custom throw
            }),
        body('email')
            .custom((value, { req }) => {
                const isDuplicate = checkDuplicate(value);
                if (value !== req.body.currentEmail && isDuplicate) {
                    throw new Error('Email is already used')
                }
                return true; // required for exit after custom throw
            })
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Email is required')
                }
                return true; // required for exit after custom throw
            })
            .isEmail().withMessage('Email is invalid'),
        check('phone', 'Phone number is invalid')
            .isMobilePhone('id-ID')
            .custom((value, { req }) => {
                const isEmpty = checkEmpty(value);
                if (isEmpty) {
                    throw new Error('Phone is required')
                }
                return true; // required for exit after custom throw
            })
    ],
    (req, res) => { // MAKE SURE THIS CODE BEFORE MIDDLEWARE '/contact/:email'
        // res.send(req.body);
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('edit-contact', {
                title: 'Edit Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body
            });
        } else {
            // res.send(req.body); debug
            const dataForm = req.body;
            updateContacts(dataForm);
            req.flash('msg', 'Current data contact successfully updated');
            res.redirect('/contact');
        }
    }
)

app.get('/contact/:email', (req, res) => {
    const title = 'Detail contact pages';
    const contact = findContact(req.params.email);
    res.render('detail', {
        title,
        contact,
        layout: 'layouts/main-layout', // ejs layouts 3
    });
})

app.get('/contact/delete/:email', (req, res) => {
    const contact = findContact(req.params.email);
    if (!contact) {
        res.status('404');
        res.send(`<h1>404</h1>`)
    } else {
        deleteContact(req.params.email);
        req.flash('msg', 'Data contact successfully deleted');
        res.redirect('/contact');
    }
})

app.get('/services', (req, res) => {
    const title = 'Services pages';
    res.render('services', {
        title,
        layout: 'layouts/main-layout' // ejs layouts 3
    });
})

/* running MIDDLEWARE 
    carefully for position this middleware code, 
    because can blocking any request HTTP, 
    if you put into first above line of routes code */
/* access 404 */
app.use((req, res) => {
    // console.log(res);
    res.status(404)
    res.send('404!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})