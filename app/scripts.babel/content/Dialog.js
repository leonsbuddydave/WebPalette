/**
 * User-facing input dialog.
 */
class Dialog extends Dispatcher {

	/**
	 * Event ID for item selection
	 */
	static get ITEM_SELECTED() {
		return 1;
	}

	/**
	 * @param {Function} filterStrategy The function to call into with
	 *                                 input to retrieve search results.
	 */
	constructor(filterStrategy) {
		super();
		this.filterStrategy = filterStrategy;
		this.currentSuggestions = [];
		this.visible = false;
		this.filterText = '';
		this.renderer = new DialogRenderer(this);
		this.filter('');
	}

	/**
	 * Toggles visibility of the dialog.
	 * @param  {Function} callback The callback to invoke when
	 *                             visibility toggling is complete.
	 */
	toggle(callback) {
		this.visible = !this.visible;
		this.renderer.render();
		if (callback) {
			callback();
		}
	}

	/**
	 * Filters the options in this dialog using the input
	 * text and the constructed filterStrategy.
	 * @param {string} text The text to filter by.
	 */
	filter(text) {
		this.filterText = text;
		this.currentSuggestions = this.filterStrategy(text);
		this.renderer.render();
	}

	/**
	 * Selects the provided item index,
	 * triggering an event dispatch.
	 * @param {Number} index The index of the selected item.
	 */
	selectItem(index) {
		const item = this.currentSuggestions[index];
		this.dispatch(Dialog.ITEM_SELECTED, item);
	}
}