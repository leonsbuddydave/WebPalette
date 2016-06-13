import Dialog from './Dialog';
import Session from './Session';
import FuzzyFilterStrategy from './FuzzyFilterStrategy';

export default class ActionAPI {
	
	constructor() {
		this.session = new Session();
	}

	click(selector) {
		let element = document.querySelector(selector);
		element.click();
	}

	navigate(url) {
		window.location.href = url;
	}

	elementExists(selector) {
		let element = document.querySelector(selector);
		return element !== null;
	}

	waitForPageLoad() {
		console.log('waitForPageLoad');
		this.session.setValue('ACTION_IN_PROGRESS', this.session.getValue('CURRENT_ACTION'));
	}

	ask(question, options, callback) {
		let d = new Dialog(new FuzzyFilterStrategy(options), question);
		d.toggle();
		d.subscribe(Dialog.ITEM_SELECTED, (item) => {
			d.toggle( () => {
				callback(item);
			})
		})
	}

	isUndefined(value) {
		return (typeof value === 'undefined');
	}

	isDefined(value) {
		return !this.isUndefined(value);
	}

	option(label, data) {
		if (typeof data === 'undefined') {
			return label;
		} else {
			return {
				label: label,
				data: data
			}
		}
	}
}