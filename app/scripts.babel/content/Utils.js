export default class Utils {
	static copy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	static flatten(arr) {
		return arr.reduce( (a, b) => {
			return a.concat(b);
		});
	}
}