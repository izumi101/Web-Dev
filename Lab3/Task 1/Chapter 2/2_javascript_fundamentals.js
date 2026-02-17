// @ts-nocheck

/variables
// ==============================

let message;





/variables
// ==============================

let message;

message = 'Hello'; // store the string 'Hello' in the variable named message





/variables
// ==============================

let message;
message = 'Hello!';

alert(message); // shows the variable content





/variables
// ==============================

let message = 'Hello!'; // define the variable and assign the value

alert(message); // Hello!





/variables
// ==============================

let user = 'John', age = 25, message = 'Hello';





/variables
// ==============================

let user = 'John';
let age = 25;
let message = 'Hello';





/variables
// ==============================

let user = 'John',
  age = 25,
  message = 'Hello';





/variables
// ==============================

let user = 'John'
  , age = 25
  , message = 'Hello';





/variables
// ==============================

var message = 'Hello';





/variables
// ==============================

let message;

message = 'Hello!';

message = 'World!'; // value changed

alert(message);





/variables
// ==============================

let hello = 'Hello world!';

let message;

// copy 'Hello world' from hello into message
message = hello;

// now two variables hold the same data
alert(hello); // Hello world!
alert(message); // Hello world!





/variables
// ==============================

let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared





/variables
// ==============================

let userName;
let test123;





/variables
// ==============================

let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3





/variables
// ==============================

let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name





/variables
// ==============================

let имя = '...';
let 我 = '...';





/variables
// ==============================

let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!





/variables
// ==============================

// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5





/variables
// ==============================

"use strict";

num = 5; // error: num is not defined





/variables
// ==============================

const myBirthday = '18.04.1982';





/variables
// ==============================

const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!





/variables
// ==============================

const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00





/variables
// ==============================

const pageLoadTime = /* time taken by a webpage to load */;





/variables
// ==============================

let admin, name; // can declare two variables at once

name = "John";

admin = name;

alert( admin ); // "John"





/variables
// ==============================

let ourPlanetName = "Earth";





/variables
// ==============================

let currentUserName = "John";





/variables
// ==============================

const birthday = '18.04.1982';

const age = someCode(birthday);





/variables
// ==============================

const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?





/types
// ==============================

// no error
let message = "hello";
message = 123456;





/types
// ==============================

let n = 123;
n = 12.345;





/types
// ==============================

alert( 1 / 0 ); // Infinity





/types
// ==============================

alert( Infinity ); // Infinity





/types
// ==============================

alert( "not a number" / 2 ); // NaN, such division is erroneous





/types
// ==============================

alert( NaN + 1 ); // NaN
alert( 3 * NaN ); // NaN
alert( "not a number" / 2 - 1 ); // NaN





/types
// ==============================

console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992





/types
// ==============================

// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;





/types
// ==============================

let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;





/types
// ==============================

let name = "John";

// embed a variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
alert( `the result is ${1 + 2}` ); // the result is 3





/types
// ==============================

alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)





/types
// ==============================

let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked





/types
// ==============================

let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")





/types
// ==============================

let age = null;





/types
// ==============================

let age;

alert(age); // shows "undefined"





/types
// ==============================

let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"





/types
// ==============================

typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)





/types
// ==============================

let name = "Ilya";

alert( `hello ${1}` ); // ?

alert( `hello ${"name"}` ); // ?

alert( `hello ${name}` ); // ?





/types
// ==============================

let name = "Ilya";

// the expression is a number 1
alert( `hello ${1}` ); // hello 1

// the expression is a string "name"
alert( `hello ${"name"}` ); // hello name

// the expression is a variable, embed it
alert( `hello ${name}` ); // hello Ilya





/type-conversions
// ==============================

let value = true;
alert(typeof value); // boolean

value = String(value); // now value is a string "true"
alert(typeof value); // string





/type-conversions
// ==============================

alert( "6" / "2" ); // 3, strings are converted to numbers





/type-conversions
// ==============================

let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number





/type-conversions
// ==============================

let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed





/type-conversions
// ==============================

alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0





/type-conversions
// ==============================

alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false





/type-conversions
// ==============================

alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)





/operators
// ==============================

let x = 1;

x = -x;
alert( x ); // -1, unary negation was applied





/operators
// ==============================

let x = 1, y = 3;
alert( y - x ); // 2, binary minus subtracts values





/operators
// ==============================

alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4





/operators
// ==============================

alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16





/operators
// ==============================

alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)





/operators
// ==============================

let s = "my" + "string";
alert(s); // mystring





/operators
// ==============================

alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"





/operators
// ==============================

alert(2 + 2 + '1' ); // "41" and not "221"





/operators
// ==============================

alert('1' + 2 + 2); // "122" and not "14"





/operators
// ==============================

alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers





/operators
// ==============================

// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0





/operators
// ==============================

let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings





/operators
// ==============================

let apples = "2";
let oranges = "3";

// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5





/operators
// ==============================

let x = 2 * 2 + 1;

alert( x ); // 5





/operators
// ==============================

let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0





/operators
// ==============================

let a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4





/operators
// ==============================

c = 2 + 2;
b = c;
a = c;





/operators
// ==============================

let n = 2;
n = n + 5;
n = n * 2;





/operators
// ==============================

let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14





/operators
// ==============================

let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16





/operators
// ==============================

let counter = 2;
counter++;        // works the same as counter = counter + 1, but is shorter
alert( counter ); // 3





/operators
// ==============================

let counter = 2;
counter--;        // works the same as counter = counter - 1, but is shorter
alert( counter ); // 1





/operators
// ==============================

let counter = 1;
let a = ++counter; // (*)

alert(a); // 2





/operators
// ==============================

let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // 1





/operators
// ==============================

let counter = 0;
counter++;
++counter;
alert( counter ); // 2, the lines above did the same





/operators
// ==============================

let counter = 0;
alert( ++counter ); // 1





/operators
// ==============================

let counter = 0;
alert( counter++ ); // 0





/operators
// ==============================

let counter = 1;
alert( 2 * ++counter ); // 4





/operators
// ==============================

let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value





/operators
// ==============================

let counter = 1;
alert( 2 * counter );
counter++;





/operators
// ==============================

let a = (1 + 2, 3 + 4);

alert( a ); // 7 (the result of 3 + 4)





/operators
// ==============================

// three operations in one line
for (a = 1, b = 3, c = a * b; a < 10; a++) {
 ...
}





/operators
// ==============================

let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?





/operators
// ==============================

let a = 1, b = 1;

alert( ++a ); // 2, prefix form returns the new value
alert( b++ ); // 1, postfix form returns the old value

alert( a ); // 2, incremented once
alert( b ); // 2, incremented once





/operators
// ==============================

let a = 2;

let x = 1 + (a *= 2);





/operators
// ==============================

"" + 1 + 0
"" - 1 + 0
true + false
6 / "3"
"2" * "3"
4 + 5 + "px"
"$" + 4 + 5
"4" - 2
"4px" - 2
"  -9  " + 5
"  -9  " - 5
null + 1
undefined + 1
" \t \n" - 2





/operators
// ==============================

"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)





/operators
// ==============================

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(a + b); // 12





/operators
// ==============================

let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12





/operators
// ==============================

let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3





/operators
// ==============================

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3





/comparison
// ==============================

alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)





/comparison
// ==============================

let result = 5 > 4; // assign the result of the comparison
alert( result ); // true





/comparison
// ==============================

alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true





/comparison
// ==============================

alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1





/comparison
// ==============================

alert( true == 1 ); // true
alert( false == 0 ); // true





/comparison
// ==============================

let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!





/comparison
// ==============================

alert( 0 == false ); // true





/comparison
// ==============================

alert( '' == false ); // true





/comparison
// ==============================

alert( 0 === false ); // false, because the types are different





/comparison
// ==============================

alert( null === undefined ); // false





/comparison
// ==============================

alert( null == undefined ); // true





/comparison
// ==============================

alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true





/comparison
// ==============================

alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)





/comparison
// ==============================

5 > 4
"apple" > "pineapple"
"2" > "12"
undefined == null
undefined === null
null == "\n0\n"
null === +"\n0\n"





/comparison
// ==============================

5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false





/ifelse
// ==============================

let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) alert( 'You are right!' );





/ifelse
// ==============================

if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}





/ifelse
// ==============================

if (0) { // 0 is falsy
  ...
}





/ifelse
// ==============================

if (1) { // 1 is truthy
  ...
}





/ifelse
// ==============================

let cond = (year == 2015); // equality evaluates to true or false

if (cond) {
  ...
}





/ifelse
// ==============================

let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // any value except 2015
}





/ifelse
// ==============================

let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}





/ifelse
// ==============================

let accessAllowed;
let age = prompt('How old are you?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);





/ifelse
// ==============================

let result = condition ? value1 : value2;





/ifelse
// ==============================

let accessAllowed = (age > 18) ? true : false;





/ifelse
// ==============================

// the comparison operator "age > 18" executes first anyway
// (no need to wrap it into parentheses)
let accessAllowed = age > 18 ? true : false;





/ifelse
// ==============================

// the same
let accessAllowed = age > 18;





/ifelse
// ==============================

let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );





/ifelse
// ==============================

if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}





/ifelse
// ==============================

let company = prompt('Which company created JavaScript?', '');

(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');





/ifelse
// ==============================

let company = prompt('Which company created JavaScript?', '');

if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}





/ifelse
// ==============================

if ("0") {
  alert( 'Hello' );
}





/ifelse
// ==============================

if ("0") {
  alert( 'Hello' );
}





/ifelse
// ==============================

// <!DOCTYPE html>
// <html>

// <body>
//   <script>
    'use strict';

    let value = prompt('What is the "official" name of JavaScript?', '');

    if (value == 'ECMAScript') {
      alert('Right!');
    } else {
      alert("You don't know? ECMAScript!");
    }
//   </script>

// </body>

// </html>





/ifelse
// ==============================

let value = prompt('Type a number', 0);

if (value > 0) {
  alert( 1 );
} else if (value < 0) {
  alert( -1 );
} else {
  alert( 0 );
}





/ifelse
// ==============================

let result;

if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}





/ifelse
// ==============================

let result = (a + b < 4) ? 'Below' : 'Over';





/ifelse
// ==============================

let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}





/ifelse
// ==============================

let message = (login == 'Employee') ? 'Hello' :
  (login == 'Director') ? 'Greetings' :
  (login == '') ? 'No login' :
  '';





/logical-operators
// ==============================

result = a || b;





/logical-operators
// ==============================

alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false





/logical-operators
// ==============================

if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}





/logical-operators
// ==============================

let hour = 9;

if (hour < 10 || hour > 18) {
  alert( 'The office is closed.' );
}





/logical-operators
// ==============================

let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}





/logical-operators
// ==============================

result = value1 || value2 || value3;





/logical-operators
// ==============================

alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)





/logical-operators
// ==============================

let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder





/logical-operators
// ==============================

true || alert("not printed");
false || alert("printed");





/logical-operators
// ==============================

result = a && b;





/logical-operators
// ==============================

alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false





/logical-operators
// ==============================

let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}





/logical-operators
// ==============================

if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}





/logical-operators
// ==============================

result = value1 && value2 && value3;





/logical-operators
// ==============================

// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0





/logical-operators
// ==============================

alert( 1 && 2 && null && 3 ); // null





/logical-operators
// ==============================

alert( 1 && 2 && 3 ); // 3, the last one





/logical-operators
// ==============================

let x = 1;

(x > 0) && alert( 'Greater than zero!' );





/logical-operators
// ==============================

let x = 1;

if (x > 0) alert( 'Greater than zero!' );





/logical-operators
// ==============================

result = !value;





/logical-operators
// ==============================

alert( !true ); // false
alert( !0 ); // true





/logical-operators
// ==============================

alert( !!"non-empty string" ); // true
alert( !!null ); // false





/logical-operators
// ==============================

alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false





/logical-operators
// ==============================

alert( null || 2 || undefined );





/logical-operators
// ==============================

alert( null || 2 || undefined );





/logical-operators
// ==============================

alert( alert(1) || 2 || alert(3) );





/logical-operators
// ==============================

alert( alert(1) || 2 || alert(3) );





/logical-operators
// ==============================

alert( 1 && null && 2 );





/logical-operators
// ==============================

alert(1 && null && 2);





/logical-operators
// ==============================

alert( alert(1) && alert(2) );





/logical-operators
// ==============================

alert( alert(1) && alert(2) );





/logical-operators
// ==============================

alert( null || 2 && 3 || 4 );





/logical-operators
// ==============================

alert( null || 2 && 3 || 4 );





/logical-operators
// ==============================

null || 3 || 4





/logical-operators
// ==============================

if (age >= 14 && age <= 90)





/logical-operators
// ==============================

if (!(age >= 14 && age <= 90))





/logical-operators
// ==============================

if (age < 14 || age > 90)





/logical-operators
// ==============================

if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );





/logical-operators
// ==============================

// Runs.
// The result of -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Doesn't run
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Executes
// Operator && has a higher precedence than ||
// so -1 && 1 executes first, giving us the chain:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );





/logical-operators
// ==============================

let userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}





/nullish-coalescing-operator
// ==============================

result = (a !== null && a !== undefined) ? a : b;





/nullish-coalescing-operator
// ==============================

let user;

alert(user ?? "Anonymous"); // Anonymous (user is undefined)





/nullish-coalescing-operator
// ==============================

let user = "John";

alert(user ?? "Anonymous"); // John (user is not null/undefined)





/nullish-coalescing-operator
// ==============================

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder





/nullish-coalescing-operator
// ==============================

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder





/nullish-coalescing-operator
// ==============================

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0





/nullish-coalescing-operator
// ==============================

let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000





/nullish-coalescing-operator
// ==============================

// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;





/nullish-coalescing-operator
// ==============================

let x = 1 && 2 ?? 3; // Syntax error





/nullish-coalescing-operator
// ==============================

let x = (1 && 2) ?? 3; // Works

alert(x); // 2





/nullish-coalescing-operator
// ==============================

// set height=100, if height is null or undefined
height = height ?? 100;





/while-for
// ==============================

while (condition) {
  // code
  // so-called "loop body"
}





/while-for
// ==============================

let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}





/while-for
// ==============================

let i = 3;
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
  alert( i );
  i--;
}





/while-for
// ==============================

let i = 3;
while (i) alert(i--);





/while-for
// ==============================

do {
  // loop body
} while (condition);





/while-for
// ==============================

let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);





/while-for
// ==============================

for (begin; condition; step) {
  // ... loop body ...
}





/while-for
// ==============================

for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}





/while-for
// ==============================

Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...





/while-for
// ==============================

// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3





/while-for
// ==============================

for (let i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable





/while-for
// ==============================

let i = 0;

for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop





/while-for
// ==============================

let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
  alert( i ); // 0, 1, 2
}





/while-for
// ==============================

let i = 0;

for (; i < 3;) {
  alert( i++ );
}





/while-for
// ==============================

for (;;) {
  // repeats without limits
}





/while-for
// ==============================

let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

  if (!value) break; // (*)

  sum += value;

}
alert( 'Sum: ' + sum );





/while-for
// ==============================

for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;

  alert(i); // 1, then 3, 5, 7, 9
}





/while-for
// ==============================

for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}





/while-for
// ==============================

if (i > 5) {
  alert(i);
} else {
  continue;
}





/while-for
// ==============================

(i > 5) ? alert(i) : continue; // continue isn't allowed here





/while-for
// ==============================

for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');





/while-for
// ==============================

labelName: for (...) {
  ...
}





/while-for
// ==============================

outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)

    // do something with the value...
  }
}

alert('Done!');





/while-for
// ==============================

outer:
for (let i = 0; i < 3; i++) { ... }





/while-for
// ==============================

break label; // jump to the label below (doesn't work)

label: for (...)





/while-for
// ==============================

label: {
  // ...
  break label; // works
  // ...
}





/while-for
// ==============================

let i = 3;

while (i) {
  alert( i-- );
}





/while-for
// ==============================

let i = 3;

while (i) {
  alert( i-- );
}





/while-for
// ==============================

let i = 3;

alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop





/while-for
// ==============================

let i = 0;
while (++i < 5) alert( i );





/while-for
// ==============================

let i = 0;
while (i++ < 5) alert( i );





/while-for
// ==============================

let i = 0;
while (++i < 5) alert( i );





/while-for
// ==============================

let i = 0;
while (i++ < 5) alert( i );





/while-for
// ==============================

for (let i = 0; i < 5; i++) alert( i );





/while-for
// ==============================

for (let i = 0; i < 5; ++i) alert( i );





/while-for
// ==============================

for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );





/while-for
// ==============================

for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) {
    alert( i );
  }
}





/while-for
// ==============================

for (let i = 0; i < 3; i++) {
  alert( `number ${i}!` );
}





/while-for
// ==============================

let i = 0;
while (i < 3) {
  alert( `number ${i}!` );
  i++;
}





/while-for
// ==============================

let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);





/while-for
// ==============================

For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}





/while-for
// ==============================

let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}





/switch
// ==============================

switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}





/switch
// ==============================

let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
  case 4:
    alert( 'Exactly!' );
    break;
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}





/switch
// ==============================

let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
}





/switch
// ==============================

alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );





/switch
// ==============================

let a = "1";
let b = 0;

switch (+a) {
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;

  default:
    alert("this doesn't run");
}





/switch
// ==============================

let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;

  default:
    alert('The result is strange. Really.');
}





/switch
// ==============================

let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}





/switch
// ==============================

switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}





/switch
// ==============================

if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}





/switch
// ==============================

let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}





/switch
// ==============================

let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
    break;
}





/function-basics
// ==============================

function showMessage() {
  alert( 'Hello everyone!' );
}





/function-basics
// ==============================

function name(parameter1, parameter2, ... parameterN) {
 // body
}





/function-basics
// ==============================

function showMessage() {
  alert( 'Hello everyone!' );
}

showMessage();
showMessage();





/function-basics
// ==============================

function showMessage() {
  let message = "Hello, I'm JavaScript!"; // local variable

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function





/function-basics
// ==============================

let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John





/function-basics
// ==============================

let userName = 'John';

function showMessage() {
  userName = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // John before the function call

showMessage();

alert( userName ); // Bob, the value was modified by the function





/function-basics
// ==============================

let userName = 'John';

function showMessage() {
  let userName = "Bob"; // declare a local variable

  let message = 'Hello, ' + userName; // Bob
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // John, unchanged, the function did not access the outer variable





/function-basics
// ==============================

function showMessage(from, text) { // parameters: from, text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)





/function-basics
// ==============================

function showMessage(from, text) {

  from = '*' + from + '*'; // make "from" look nicer

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann





/function-basics
// ==============================

showMessage("Ann");





/function-basics
// ==============================

function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given





/function-basics
// ==============================

showMessage("Ann", undefined); // Ann: no text given





/function-basics
// ==============================

function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}





/function-basics
// ==============================

function showMessage(from, text) {
  if (text === undefined) {
    text = 'no text given';
  }

  alert( from + ": " + text );
}





/function-basics
// ==============================

function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}





/function-basics
// ==============================

function showMessage(text) {
  // ...

  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }

  alert(text);
}

showMessage(); // empty message





/function-basics
// ==============================

function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}





/function-basics
// ==============================

function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown





/function-basics
// ==============================

function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3





/function-basics
// ==============================

function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('Do you have permission from your parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}





/function-basics
// ==============================

function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}





/function-basics
// ==============================

function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true





/function-basics
// ==============================

function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true





/function-basics
// ==============================

return
 (some + long + expression + or + whatever * f(a) + f(b))





/function-basics
// ==============================

return;
 (some + long + expression + or + whatever * f(a) + f(b))





/function-basics
// ==============================

return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )





/function-basics
// ==============================

showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false





/function-basics
// ==============================

function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}





/function-basics
// ==============================

function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}





/function-basics
// ==============================

function name(parameters, delimited, by, comma) {
  /* code */
}





/function-basics
// ==============================

function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
}





/function-basics
// ==============================

function checkAge(age) {
  if (age > 18) {
    return true;
  }
  // ...
  return confirm('Did parents allow you?');
}





/function-basics
// ==============================

function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}





/function-basics
// ==============================

function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}





/function-basics
// ==============================

function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}





/function-basics
// ==============================

min(2, 5) == 2
min(3, -1) == -1
min(1, 1) == 1





/function-basics
// ==============================

function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}





/function-basics
// ==============================

function min(a, b) {
  return a < b ? a : b;
}





/function-basics
// ==============================

pow(3, 2) = 3 * 3 = 9
pow(3, 3) = 3 * 3 * 3 = 27
pow(1, 100) = 1 * 1 * ...* 1 = 1





/function-basics
// ==============================

function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Power ${n} is not supported, use a positive integer`);
} else {
  alert( pow(x, n) );
}





/function-expressions
// ==============================

function sayHi() {
  alert( "Hello" );
}





/function-expressions
// ==============================

let sayHi = function() {
  alert( "Hello" );
};





/function-expressions
// ==============================

function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // shows the function code





/function-expressions
// ==============================

function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)





/function-expressions
// ==============================

let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;  //(2)
// ...





/function-expressions
// ==============================

function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
};





/function-expressions
// ==============================

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);





/function-expressions
// ==============================

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);





/function-expressions
// ==============================

// Function Declaration
function sum(a, b) {
  return a + b;
}





/function-expressions
// ==============================

// Function Expression
let sum = function(a, b) {
  return a + b;
};





/function-expressions
// ==============================

sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}





/function-expressions
// ==============================

sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};





/function-expressions
// ==============================

let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
welcome(); // Error: welcome is not defined





/function-expressions
// ==============================

let age = 16; // take 16 as an example

if (age < 18) {
  welcome();               // \   (runs)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
  welcome();               // /   (runs)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined





/function-expressions
// ==============================

let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // ok now





/function-expressions
// ==============================

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // ok now





/arrow-functions-basics
// ==============================

let func = (arg1, arg2, ..., argN) => expression;





/arrow-functions-basics
// ==============================

let func = function(arg1, arg2, ..., argN) {
  return expression;
};





/arrow-functions-basics
// ==============================

let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3





/arrow-functions-basics
// ==============================

let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

alert( double(3) ); // 6





/arrow-functions-basics
// ==============================

let sayHi = () => alert("Hello!");

sayHi();





/arrow-functions-basics
// ==============================

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();





/arrow-functions-basics
// ==============================

let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, then we need an explicit "return"
};

alert( sum(1, 2) ); // 3





/arrow-functions-basics
// ==============================

function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);





/arrow-functions-basics
// ==============================

function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
);



