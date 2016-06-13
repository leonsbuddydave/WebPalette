export default class FuzzyFilterStrategy {
	constructor(items) {
		this.items = items;
		this.itemType = typeof items[0];
	}

	invoke(text) {
		let items;
		if (typeof this.items === 'function') {
			items = this.items();
		} else {
			items = this.items;
		}

		return items.filter((item) => {
			let itemText = (item.label || item).toLowerCase();
			let matches = itemText.includes(text.toLowerCase());
			return matches;
		});
	}
};