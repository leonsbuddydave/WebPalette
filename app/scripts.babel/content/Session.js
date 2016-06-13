let instance = null;

import Storage from './Storage';

export default class Session {
	constructor() {
		if (!instance) {
			instance = this;
			this.storage = new Storage();
			this.sessionData = JSON.parse(this.storage.get('session')) || {};
		}
		return instance;
	}

	persist() {
		this.storage.set('session', JSON.stringify(this.sessionData));
	}

	getValue(key) {
		return this.sessionData[key] || null;
	}

	exists(key) {
		return (typeof this.sessionData[key] !== 'undefined');
	}

	setValue(key, value) {
		this.sessionData[key] = value;
		this.persist();
	}

	removeValue(key) {
		delete this.sessionData[key];
		this.persist();	
	}
}