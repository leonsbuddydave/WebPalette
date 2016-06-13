export default class Storage {
	constructor() {
		this.localStorage = window.localStorage;
	}

	clear(key) {
		delete this.localStorage[key];
	}

	get(key) {
		return this.localStorage[key] || null;
	}

	set(key, value) {
		if (typeof key !== 'string' || typeof value !== 'string') {
			throw new Error('Storage key/value only supports strings and ints');
		}
		this.localStorage[key] = value;
	}
}