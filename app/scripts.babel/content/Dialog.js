import Dispatcher from './Dispatcher';
import DialogRenderer from './DialogRenderer';

/**
 * User-facing input dialog.
 */
export default class Dialog extends Dispatcher {

	static getCurrentDialog() {
		return this.currentDialog;
	}

	static setCurrentDialog(dialog) {
		this.currentDialog = dialog;
	}

	static clearCurrentDialog() {
		if (this.currentDialog) {
			this.currentDialog.toggle();
		}
	}

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
	constructor(filterStrategy, flavorText) {
		super();
		this.filterStrategy = filterStrategy;
		this.flavorText = flavorText;
		this.currentSuggestions = [];
		this.visible = false;
		this.freeformTextEnabled = false;
		this.filterText = '';
		this.renderer = new DialogRenderer(this);
		this.filter('');
	}

	/**
	 * Enables free-form text (with no suggestions) for this dialog
	 * @param  {boolean} enabled Whether this dialog is freeform
	 */
	enableFreeformText(enabled) {
		this.freeformTextEnabled = enabled;
		this.renderer.render();
	}

	getFlavorText() {
		return this.flavorText;
	}

	/**
	 * Toggles visibility of the dialog.
	 * @param  {Function} callback The callback to invoke when
	 *                             visibility toggling is complete.
	 */
	toggle(callback) {
		this.visible = !this.visible;

		if (!this.visible) {
			Dialog.setCurrentDialog(null);
		} else {
			Dialog.setCurrentDialog(this);
		}

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