export default class ActionAPI {
	
	click() {}

	navigate() {}

	elementExists() {}

	waitForPageLoad() {}

	ask() {}

	isUndefined(value) {
		return (typeof value === 'undefined');
	}

	isDefined(value) {
		return !this.isUndefined(value);
	}
}