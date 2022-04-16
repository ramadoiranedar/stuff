const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    // res.send(`<h1>Hello World</h1>`); // send html

    // res.json({ // send json
    //     name: 'damar',
    //     email : 'damar@email.clom',
    //     phone: '081239233'
    // })
    res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname })
})

app.get('/services', (req, res) => {
    res.sendFile('./services.html', { root: __dirname })
})

// GET Param
// /product/20/category/shoes
app.get('/product/:idProduct', (req, res) => {
    res.send(`Product ID: ${req.params.idProduct}<br>Category ID: ${req.query.category}`)
})
// /product/20?category=shoes
app.get('/product/:idProduct/:idCategory', (req, res) => {
    res.send(`Product ID: ${req.params.idProduct}<br>Category: ${req.params.idCategory}`)
})

/* running MIDDLEWARE
    carefully for position this middleware code, 
    because can blocking any request HTTP, 
    if you put into first above line of routes code */
app.use('/', (req, res) => {
    // console.log(res);
    res.status(404)
    res.send('404!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})