const express = require('express')
const expressLayouts = require('express-ejs-layouts') // ejs layouts 1
const morgan = require('morgan')
const app = express()
const PORT = 3000

// Set View Engine - EJS
app.set('view engine', 'ejs');
// Third-party middleware
app.use(expressLayouts) // ejs layouts 2

// Built-in middleware
app.use(express.static('public'));
app.use(morgan('dev'))

// Application level middleware
app.use((req, res, next) => { // sample middleware 1
    console.log(`middleware 1`);
    console.log(`Time: ${Date.now()}`);
    next(); // relative to the next middleware, in this case is '/' 
});
app.use((req, res, next) => { // sample middleware 2
    console.log(`middleware 2`);
    console.log(`Time: ${Date.now()}`);
    next(); // relative to the next middleware, in this case is '/' 
});

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
    res.render('contact', {
        title,
        layout: 'layouts/main-layout' // ejs layouts 3
    });
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