# cartesian-mutable [![NPM version](https://badge.fury.io/js/cartesian-mutable.svg)](http://badge.fury.io/js/cartesian-mutable) [![Build Status](https://travis-ci.org/shkuznetsov/cartesian-mutable.svg?branch=master)](https://travis-ci.org/shkuznetsov/cartesian-mutable)
Cartesian product with a twist: each set can mutate depending on the values picked from the previous sets.

## Basic usage
The API is backwards compatible with many other cartesian modules on npm. 
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	greeting: ['Hello', 'Good bye'],
	name: ['Mr. Anderson', 'Agent Smith']
}));
```
🡇
```
[ { greeting: 'Hello', name: 'Mr. Anderson' },
  { greeting: 'Hello', name: 'Agent Smith' },
  { greeting: 'Good bye', name: 'Mr. Anderson' },
  { greeting: 'Good bye', name: 'Agent Smith' } ]
```

## Fun stuff, that makes this module different
If you need a property to depend on other properties' values, use a function instead of an array. 
The function will be called with a single argument: an object containing values for all the properties _above this one_.

### Mutate a set of values for a property  
If the function returns an array, it will be used as a set of values for the property. 
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	meal: ['breakfast', 'lunch'],
	drink: (v) => v.meal === 'breakfast' ? ['water', 'milk'] : ['tea', 'coffee']
}));
```
🡇
```
[ { meal: 'breakfast', drink: 'water' },
  { meal: 'breakfast', drink: 'milk' },
  { meal: 'lunch', drink: 'tea' },
  { meal: 'lunch', drink: 'coffee' } ]
```

### Make a property conditional
If the function returns an `undefined`, the property will not be used in the product.
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	meal: ['breakfast', 'lunch'],
	drink: (v) => v.meal === 'breakfast' ? ['water', 'milk'] : ['tea', 'coffee'],
	sugar: (v) => v.meal === 'breakfast' ? undefined : [true, false] 
}));
```
🡇
```
[ { meal: 'breakfast', drink: 'water' },
  { meal: 'breakfast', drink: 'milk' },
  { meal: 'lunch', drink: 'tea', sugar: true },
  { meal: 'lunch', drink: 'tea', sugar: false },
  { meal: 'lunch', drink: 'coffee', sugar: true },
  { meal: 'lunch', drink: 'coffee', sugar: false } ]
```

### Specify an explicit value for a property
If the function returns any other value (i.e. neither an Array nor an `undefined`) it will be used as a value for the property.   
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	meal: ['breakfast', 'lunch'],
	drink: (v) => v.meal === 'breakfast' ? ['water', 'milk'] : ['tea', 'coffee'],
	food: (v) => v.meal === 'breakfast' ? 'granola' : 'sandwich'
}));
```
🡇
```
[ { meal: 'breakfast', drink: 'water', food: 'granola' },
  { meal: 'breakfast', drink: 'milk', food: 'granola' },
  { meal: 'lunch', drink: 'tea', food: 'sandwich' },
  { meal: 'lunch', drink: 'coffee', food: 'sandwich' } ]
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)