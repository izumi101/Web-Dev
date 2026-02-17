// @ts-nocheck

/object
// ==============================

let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax





/object
// ==============================

let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};





/object
// ==============================

// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30





/object
// ==============================

user.isAdmin = true;





/object
// ==============================

delete user.age;





/object
// ==============================

let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
};





/object
// ==============================

let user = {
  name: "John",
  age: 30,
}





/object
// ==============================

// this would give a syntax error
user.likes birds = true





/object
// ==============================

let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];





/object
// ==============================

let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;





/object
// ==============================

let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")





/object
// ==============================

let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined





/object
// ==============================

let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"





/object
// ==============================

let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// take property name from the fruit variable
bag[fruit] = 5;





/object
// ==============================

let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};





/object
// ==============================

function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John





/object
// ==============================

function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}





/object
// ==============================

let user = {
  name,  // same as name:name
  age: 30
};





/object
// ==============================

// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6





/object
// ==============================

let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)





/object
// ==============================

let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended





/object
// ==============================

let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"





/object
// ==============================

"key" in object





/object
// ==============================

let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist





/object
// ==============================

let user = { age: 30 };

let key = "age";
alert( key in user ); // true, property "age" exists





/object
// ==============================

let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!





/object
// ==============================

for (key in object) {
  // executes the body for each key among object properties
}





/object
// ==============================

let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}





/object
// ==============================

let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}





/object
// ==============================

// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property





/object
// ==============================

let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}





/object
// ==============================

let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}





/object
// ==============================

let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;





/object
// ==============================

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false





/object
// ==============================

function isEmpty(obj) {
  for (let key in obj) {
    // if the loop has started, there is a property
    return false;
  }
  return true;
}





/object
// ==============================

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}





/object
// ==============================

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0;
for (let key in salaries) {
  sum += salaries[key];
}

alert(sum); // 390





/object
// ==============================

// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};





/object
// ==============================

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}





/object-copy
// ==============================

let message = "Hello!";
let phrase = message;





/object-copy
// ==============================

let user = {
  name: "John"
};





/object-copy
// ==============================

let user = { name: "John" };

let admin = user; // copy the reference





/object-copy
// ==============================

let user = { name: 'John' };

let admin = user;

admin.name = 'Pete'; // changed by the "admin" reference

alert(user.name); // 'Pete', changes are seen from the "user" reference





/object-copy
// ==============================

let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true





/object-copy
// ==============================

let a = {};
let b = {}; // two independent objects

alert( a == b ); // false





/object-copy
// ==============================

const user = {
  name: "John"
};

user.name = "Pete"; // (*)

alert(user.name); // Pete





/object-copy
// ==============================

let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object





/object-copy
// ==============================

Object.assign(dest, ...sources)





/object-copy
// ==============================

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true





/object-copy
// ==============================

let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }





/object-copy
// ==============================

let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);

alert(clone.name); // John
alert(clone.age); // 30





/object-copy
// ==============================

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182





/object-copy
// ==============================

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one





/object-copy
// ==============================

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = structuredClone(user);

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related





/object-copy
// ==============================

let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true





/object-copy
// ==============================

// error
structuredClone({
  f: function() {}
});





/garbage-collection
// ==============================

// user has a reference to the object
let user = {
  name: "John"
};





/garbage-collection
// ==============================

user = null;





/garbage-collection
// ==============================

// user has a reference to the object
let user = {
  name: "John"
};

let admin = user;





/garbage-collection
// ==============================

user = null;





/garbage-collection
// ==============================

function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});





/garbage-collection
// ==============================

delete family.father;
delete family.mother.husband;





/garbage-collection
// ==============================

family = null;





/object-methods
// ==============================

let user = {
  name: "John",
  age: 30
};





/object-methods
// ==============================

let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!





/object-methods
// ==============================

let user = {
  // ...
};

// first, declare
function sayHi() {
  alert("Hello!");
}

// then add as a method
user.sayHi = sayHi;

user.sayHi(); // Hello!





/object-methods
// ==============================

// these objects do the same

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// method shorthand looks better, right?
user = {
  sayHi() { // same as "sayHi: function(){...}"
    alert("Hello");
  }
};





/object-methods
// ==============================

let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  }

};

user.sayHi(); // John





/object-methods
// ==============================

let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // "user" instead of "this"
  }

};





/object-methods
// ==============================

let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // leads to an error
  }

};

let admin = user;
user = null; // overwrite to make things obvious

admin.sayHi(); // TypeError: Cannot read property 'name' of null





/object-methods
// ==============================

function sayHi() {
  alert( this.name );
}





/object-methods
// ==============================

let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)





/object-methods
// ==============================

function sayHi() {
  alert(this);
}

sayHi(); // undefined





/object-methods
// ==============================

let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya





/object-methods
// ==============================

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?





/object-methods
// ==============================

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined





/object-methods
// ==============================

function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined





/object-methods
// ==============================

function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user = makeUser();

alert( user.ref().name ); // John





/object-methods
// ==============================

let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );





/object-methods
// ==============================

let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );





/object-methods
// ==============================

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};





/object-methods
// ==============================

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0





/object-methods
// ==============================

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0





/object-methods
// ==============================

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0





/object-methods
// ==============================

ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0





/constructor-new
// ==============================

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false





/constructor-new
// ==============================

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}





/constructor-new
// ==============================

let user = {
  name: "Jack",
  isAdmin: false
};





/constructor-new
// ==============================

// create a function and immediately call it with new
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};





/constructor-new
// ==============================

function User() {
  alert(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }





/constructor-new
// ==============================

function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John





/constructor-new
// ==============================

function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object





/constructor-new
// ==============================

function SmallUser() {

  this.name = "John";

  return; // <-- returns this
}

alert( new SmallUser().name );  // John





/constructor-new
// ==============================

let user = new User; // <-- no parentheses
// same as
let user = new User();





/constructor-new
// ==============================

function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

let john = new User("John");

john.sayHi(); // My name is: John

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/





/constructor-new
// ==============================

function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true





/constructor-new
// ==============================

let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true





/constructor-new
// ==============================

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );





/constructor-new
// ==============================

function Calculator() {

  this.read = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.sum = function() {
    return this.a + this.b;
  };

  this.mul = function() {
    return this.a * this.b;
  };
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );





/constructor-new
// ==============================

let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values





/constructor-new
// ==============================

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += +prompt('How much to add?', 0);
  };

}

let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);





/optional-chaining
// ==============================

let user = {}; // a user without "address" property

alert(user.address.street); // Error!





/optional-chaining
// ==============================

// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null





/optional-chaining
// ==============================

let user = {};

alert(user.address ? user.address.street : undefined);





/optional-chaining
// ==============================

let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;





/optional-chaining
// ==============================

let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);





/optional-chaining
// ==============================

let user = {}; // user has no address

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)





/optional-chaining
// ==============================

let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)





/optional-chaining
// ==============================

let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's no element





/optional-chaining
// ==============================

let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined





/optional-chaining
// ==============================

// ReferenceError: user is not defined
user?.address;





/optional-chaining
// ==============================

let user = null;
let x = 0;

user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++

alert(x); // 0, value not incremented





/optional-chaining
// ==============================

let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)





/optional-chaining
// ==============================

let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined





/optional-chaining
// ==============================

delete user?.name; // delete user.name if user exists





/optional-chaining
// ==============================

let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"





/symbol
// ==============================

let id = Symbol();





/symbol
// ==============================

// id is a symbol with the description "id"
let id = Symbol("id");





/symbol
// ==============================

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false





/symbol
// ==============================

let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string





/symbol
// ==============================

let id = Symbol("id");
alert(id.toString()); // Symbol(id), now it works





/symbol
// ==============================

let id = Symbol("id");
alert(id.description); // id





/symbol
// ==============================

let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key





/symbol
// ==============================

// ...
let id = Symbol("id");

user[id] = "Their id value";





/symbol
// ==============================

let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!





/symbol
// ==============================

let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // not "id": 123
};





/symbol
// ==============================

let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name, age (no symbols)

// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123





/symbol
// ==============================

let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123





/symbol
// ==============================

// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true





/symbol
// ==============================

// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id





/symbol
// ==============================

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name





/object-toprimitive
// ==============================

// output
alert(obj);

// using object as a property key
anotherObj[obj] = 123;





/object-toprimitive
// ==============================

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;





/object-toprimitive
// ==============================

// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };





/object-toprimitive
// ==============================

obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};





/object-toprimitive
// ==============================

let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500





/object-toprimitive
// ==============================

let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true





/object-toprimitive
// ==============================

let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500





/object-toprimitive
// ==============================

let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500





/object-toprimitive
// ==============================

let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number





/object-toprimitive
// ==============================

let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation



