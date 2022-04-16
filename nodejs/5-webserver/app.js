const fs = require('fs');
const http = require('http');

const PORT = 3000;
const OK = 200;

// const server = http.createServer((req, res) => {
//     console.log(req, res);
// });
// server.listen(3000, () => { console.log('Server is listening on prot 3000. .'); });

const server = http.createServer((req, res) => {
    // console.log(req);
    // console.log(res);

    //  Heeader
    res.writeHead(OK, {
        'Content-Type': 'text/html'
    });

    const url = req.url;
    console.log(url);

    const renderHTML = (html, res) => {
        fs.readFile(html, (errors, data) => {
            if (errors) {
                res.writeHead(404);
                res.write('Error: File not found.')
                throw errors;
            } else {
                res.write(data);
            }
            res.end();
        });
    }

    // Write
    // based on URL
    if (url === '/about') {
        renderHTML('./about.html', res);
    } else if (url === '/services') {
        renderHTML('./services.html', res);
    } else if (url === '/contact') {
        renderHTML('./contact.html', res);
    } else {
        renderHTML('./index.html', res);
    }
});

server.listen(PORT, () => console.log(`Server is listening on prot ${PORT}..`));