function printName(name) {
    return name;
}
const PI = 3.14;

const Student = {
    name: 'Ario d',
    age: 22,
    printStudent() {
        return `Hello! My name is ${this.name} and my age is ${this.age}.`;
    }
}

class People {
    constructor() {
        console.log(`Created object People.`);
    }
}

module.exports.printName = printName;
module.exports.PI = PI;
module.exports.Student = Student;
module.exports.People = People;

module.exports = {
    printName,
    PI,
    Student,
    People
};