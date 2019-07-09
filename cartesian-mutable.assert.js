const assert = require('assert');
const cartesian = require('./cartesian-mutable');

describe('Should work in a backward-compatible mode', () => {
	it('Should calculate a 2x2 product with numbers and strings', () => {
		let product = cartesian({
			a: [1, 2],
			b: ['a', 'b']
		});
		assert.deepStrictEqual(product, [
			{a: 1, b: 'a'},
			{a: 1, b: 'b'},
			{a: 2, b: 'a'},
			{a: 2, b: 'b'}
		]);
	});
	it('Should calculate a 2x2 product with booleans and functions', () => {
		let f1 = () => {};
		let f2 = () => {};
		let product = cartesian({
			a: [true, false],
			b: [f1, f2]
		});
		assert.deepStrictEqual(product, [
			{a: true, b: f1},
			{a: true, b: f2},
			{a: false, b: f1},
			{a: false, b: f2}
		]);
	});
	it('Should calculate a 2x2 product with arrays and objects', () => {
		let a1 = [1], a2 = [2];
		let o1 = {x:1}, o2 = {y:2};
		let product = cartesian({
			a: [a1, a2],
			b: [o1, o2]
		});
		assert.deepStrictEqual(product, [
			{a: a1, b: o1},
			{a: a1, b: o2},
			{a: a2, b: o1},
			{a: a2, b: o2}
		]);
	});
});

describe('Should recognise special values', () => {
	it('Should recognise undefined', () => {
		let product = cartesian({
			a: [1, 2],
			b: undefined
		});
		assert.deepStrictEqual(product, [
			{a: 1},
			{a: 2}
		]);
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
		assert.deepStrictEqual(product, [
			{a: 1, b: 1, c: 'a', d: true, e: o},
			{a: 2, b: 1, c: 'a', d: true, e: o}
		]);
	});
});

describe('Should run functions', () => {
	it('Should accept function returning array and undefined', () => {
		let product = cartesian({
			a: [1, 2],
			b: (v) => v.a === 1 ? [3, 4] : undefined
		});
		assert.deepStrictEqual(product, [
			{a: 1, b: 3},
			{a: 1, b: 4},
			{a: 2}
		]);
	});
	it('Should accept function returning scalars', () => {
		let product = cartesian({
			a: [1, 2],
			b: (v) => v.a === 1 ? 3 : 's'
		});
		assert.deepStrictEqual(product, [
			{a: 1, b: 3},
			{a: 2, b: 's'}
		]);
	});
});