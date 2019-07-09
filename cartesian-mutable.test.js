const cartesian = require('./cartesian-mutable');

describe('Should work in a backward-compatible mode', () => {
	it('Should calculate a 2x2 product with numbers and strings', () => {
		let product = cartesian({
			a: [1, 2],
			b: ['a', 'b']
		});
		expect(product).toContainEqual({a: 1, b: 'a'});
		expect(product).toContainEqual({a: 1, b: 'b'});
		expect(product).toContainEqual({a: 2, b: 'a'});
		expect(product).toContainEqual({a: 2, b: 'b'});
		expect(product.length).toEqual(4);
	});
	it('Should calculate a 2x2 product with booleans and functions', () => {
		let f1 = () => {};
		let f2 = () => {};
		let product = cartesian({
			a: [true, false],
			b: [f1, f2]
		});
		expect(product).toContainEqual({a: true, b: f1});
		expect(product).toContainEqual({a: true, b: f2});
		expect(product).toContainEqual({a: false, b: f1});
		expect(product).toContainEqual({a: false, b: f2});
		expect(product.length).toEqual(4);
	});
	it('Should calculate a 2x2 product with arrays and objects', () => {
		let a1 = [1], a2 = [2];
		let o1 = {x:1}, o2 = {y:2};
		let product = cartesian({
			a: [a1, a2],
			b: [o1, o2]
		});
		expect(product).toContainEqual({a: a1, b: o1});
		expect(product).toContainEqual({a: a1, b: o2});
		expect(product).toContainEqual({a: a2, b: o1});
		expect(product).toContainEqual({a: a2, b: o2});
		expect(product.length).toEqual(4);
	});
});

describe('Should recognise special values', () => {
	it('Should recognise undefined', () => {
		let product = cartesian({
			a: [1, 2],
			b: undefined
		});
		expect(product).toContainEqual({a: 1});
		expect(product).toContainEqual({a: 2});
		expect(product.length).toEqual(2);
	});
	it('Should recognise non-arrays', () => {
		let o = {a:1};
		let product = cartesian({
			a: [1, 2],
			b: 1,
			c: 'a',
			d: true,
			e: o,
		});
		expect(product).toContainEqual({a: 1, b: 1, c: 'a', d: true, e: o});
		expect(product).toContainEqual({a: 2, b: 1, c: 'a', d: true, e: o});
		expect(product.length).toEqual(2);
	});
});

describe('Should run functions', () => {
	it('Should accept function returning array and undefined', () => {
		let product = cartesian({
			a: [1, 2],
			b: (v) => v.a === 1 ? [3, 4] : undefined
		});
		expect(product).toContainEqual({a: 1, b: 3});
		expect(product).toContainEqual({a: 1, b: 4});
		expect(product).toContainEqual({a: 2});
		expect(product.length).toEqual(3);
	});
	it('Should accept function returning scalars', () => {
		let product = cartesian({
			a: [1, 2],
			b: (v) => v.a === 1 ? 3 : 's'
		});
		expect(product).toContainEqual({a: 1, b: 3});
		expect(product).toContainEqual({a: 2, b: 's'});
		expect(product.length).toEqual(2);
	});
});