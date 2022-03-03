// it's just a comment

// print to console browser
console.log('HELLO WORLD!')

// Variable and data type
let vString = "It's Variable String"
let vNumber = 1234567890 // value max 15 number characters
let vFloat = 4.404 // value max number characters suffix after . is 15 characters
let vBoolean = true // value is true or false
let vUndefined // value undefined or null

// Operator Arithmetic
// (), *, /, %, +, - // BINARY
let vOperatorArithmetic = (1 + (2 + 3) * 2) + ((10 / 5) - (10 % 2))
console.log(vOperatorArithmetic)

// Operator Assignment
// =, +=, -=, *=, /=, %= // BINARY
let vOperatorAssignment = 10
vOperatorAssignment %= 1
vOperatorAssignment += 1
vOperatorAssignment *= 1
vOperatorAssignment /= 1
vOperatorAssignment -= 1
console.log(vOperatorAssignment)

// Operator String
// =, += // BINARY
let vOperatorString = "It's String"
vOperatorString += " with Concatenation"

// Operator Comparisson
// ==, ===, !=, !==, <, >, <=, >=  // BINARY
let vOperatorComparisson = ((1 == 1) === ("1" == 1)) == ((5 <= 5) && (5 < 5)) == ((10 > 10) == (10 >= 10) == (("5" != 5) == (5 !== 5)))
console.log(vOperatorComparisson)

// Operator Logical
// !, ||, && // BINARY
let vOperatorLogical = !(false) || (20 && "20")
console.log(vOperatorLogical)

// Operator Conditional 
// (operand 1) ? operand 2 : operand 3 // TERNARY
let vOperatorConditional = (10 > 1) ? "TRUE" : false 
console.log(vOperatorConditional)

// Operator typeof
// typeOf(operand) ir typeOf operand // UNARY
let vOperatorTypeOf = typeof vBoolean
console.log(vOperatorTypeOf)

// Operator Bitwise
// &, |, ~, ^, <<, >> // BINARY