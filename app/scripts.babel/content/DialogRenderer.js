const ENTER = 13;
const DOWN_ARROW = 40;
const UP_ARROW = 38;
const MINIMUM_VISIBLE_SUGGESTIONS = 2;

/**
 * Renderer for the user input dialog.
 */
class DialogRenderer {

	/**
	 * @param {Dialog} dialog The dialog to render to the user.
	 */
	constructor(dialog) {
		this.dialog = dialog;
		this.selectedSuggestionIndex = 0;

		// Create a backdrop element
		this.backdrop = document.createElement('div');
		this.backdrop.classList.add('webactions-backdrop');

		// Create container
		this.container = document.createElement('div');
		this.container.classList.add('webactions-command-palette');

		// Create a text input
		this.textInput = document.createElement('input');
		this.textInput.type = 'text';
		this.container.appendChild(this.textInput);

		// Create a list for holding command suggestions
		this.suggestionsContainer = document.createElement('div');
		this.suggestionsContainer.classList.add('webactions-command-suggestions');
		this.container.appendChild(this.suggestionsContainer);

		// Set up some events and shit
		this.textInput.addEventListener('input', (e) => {
			return this.onInput(e);
		});
		this.textInput.addEventListener('keydown', (e) => {
			return this.onKeyDown(e);
		});
		document.body.appendChild(this.backdrop);
		document.body.appendChild(this.container);
	}

	/**
	 * Fired on a keydown in the input text field.
	 * @param  {KeyboardEvent} e A keyboard event.
	 * @return {boolean}   Whether or not to stop event bubbling.
	 */
	onKeyDown(e) {
		if (e.keyCode === ENTER) {
			this.dialog.selectItem(this.selectedSuggestionIndex);
		} else if (e.keyCode === UP_ARROW) {
			this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, 0);
			this.render();
			e.preventDefault();
			return false;
		} else if (e.keyCode === DOWN_ARROW) {
			this.selectedSuggestionIndex = Math.min(
				this.selectedSuggestionIndex + 1,
				this.dialog.currentSuggestions.length - 1
			);
			e.preventDefault();
			this.render();
			return false;
		}
	}

	/**
	 * Fired when the input value in the text field changes.
	 * @param  {Event} e The event details.
	 * @return {boolean}   Whether or not to stop event bubbling.
	 */
	onInput(e) {
			this.selectedSuggestionIndex = 0;
			this.dialog.filter(e.target.value);
	}

	/**
	 * Reflects the current state of the dialog to the DOM.
	 */
	render() {
		// Adjust visibility
		if (this.dialog.visible) {
			this.container.classList.add('show');
			this.backdrop.classList.add('show');
			this.textInput.focus();
		} else {
			this.container.classList.remove('show');
			this.backdrop.classList.remove('show');
			this.textInput.value = '';
			this.selectedSuggestionIndex = 0;
		}

		this.suggestionsContainer.innerHTML = '';

		// Render suggestion list
		const suggestionFragment = document.createDocumentFragment();
		const suggestions = this.dialog.currentSuggestions;
		if (suggestions.length >= MINIMUM_VISIBLE_SUGGESTIONS) {
			suggestions.forEach((suggestion, i) => {
				var item = document.createElement('div');
				item.innerHTML = '<div>' + (suggestion.label || suggestion) + '</div>';
				let index = i;
				item.addEventListener('click', () => {
					this.dialog.selectItem(i);
				});
				if (i === this.selectedSuggestionIndex) {
					item.classList.add('selected');
				}
				suggestionFragment.appendChild(item);
			});
		}

		this.suggestionsContainer.appendChild(suggestionFragment);
	}
}