# cartesian-mutable
Cartesian product with a twist: each set can mutate depending on the values picked from previous sets.

## Basic usage
The API is backwards compatible with many other cartesian modules on npm. 
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	greeting: ['Hello', 'Good bye'],
	name: ['Mr. Anderson', 'Agent Smith']
}));
```
Produces:
```
[ { greeting: 'Hello', name: 'Mr. Anderson' },
  { greeting: 'Hello', name: 'Agent Smith' },
  { greeting: 'Good bye', name: 'Mr. Anderson' },
  { greeting: 'Good bye', name: 'Agent Smith' } ]
```

## Make values conditional
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	meal: ['breakfast', 'lunch'],
	drink: (v) => v.meal === 'breakfast' ? ['water', 'milk'] : ['tea', 'coffee']
}));
```
Produces:
```
[ { meal: 'breakfast', drink: 'water' },
  { meal: 'breakfast', drink: 'milk' },
  { meal: 'lunch', drink: 'tea' },
  { meal: 'lunch', drink: 'coffee' } ]
```

## Make a parameter conditional
```javascript
const cartesian = require('cartesian-mutable');
console.log(cartesian({
	meal: ['breakfast', 'lunch'],
	drink: (v) => v.meal === 'breakfast' ? ['water', 'milk'] : ['tea', 'coffee'],
	sugar: (v) => v.meal === 'lunch' ? [true, false] : undefined
}));
```
Produces:
```
[ { meal: 'breakfast', drink: 'water' },
  { meal: 'breakfast', drink: 'milk' },
  { meal: 'lunch', drink: 'tea', sugar: true },
  { meal: 'lunch', drink: 'tea', sugar: false },
  { meal: 'lunch', drink: 'coffee', sugar: true },
  { meal: 'lunch', drink: 'coffee', sugar: false } ]
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)