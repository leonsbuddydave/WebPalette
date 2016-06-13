import Dialog from './Dialog';

export default class ActionAPI {
	
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
	}

	ask(question, options, callback) {
		let d = new Dialog(() => {
			return options;
		});
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
}