// 1. Core Module
// const fs = require('fs');
// 2. Local Module (./)
const test = require('./test');
// 3. Third-party Module / NPM Module / Library / node_modules
// const moment = require('moment');

console.log(test);
console.log(
    test.printName('Damar'), 
    test.PI, 
    test.Student, 
    new test.People);