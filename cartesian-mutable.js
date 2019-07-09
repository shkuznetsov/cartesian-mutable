module.exports = function flexCartesian (sets) {
	let result = [];
	const setsArray = Object.entries(sets);
	const iterate = (obj, i) => {
		let newObj = Object.assign({}, obj);
		if (i < setsArray.length) {
			let [param, values] = setsArray[i];
			if (typeof(values) === 'function') {
				values = values(newObj);
			}
			if (typeof(values) === 'undefined') {
				iterate(newObj, i+1);
			}
			else if (Array.isArray(values)) values.forEach((value) => {
				newObj[param] = value;
				iterate(newObj, i+1);
			});
			else {
				newObj[param] = values;
				iterate(newObj, i+1);
			}
		}
		else result.push(newObj);
	};
	iterate({}, 0);
	return result;
};