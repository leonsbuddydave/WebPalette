class Dialog extends Dispatcher {

	static get ITEM_SELECTED() {
		return 1;
	}

	constructor(filterStrategy) {
		super();
		this.filterStrategy = filterStrategy;
		this.currentSuggestions = [];
		this.visible = false;
		this.filterText = '';
		this.renderer = new DialogRenderer(this);
		this.filter('');
	}

	toggle(callback) {
		this.visible = !this.visible;
		this.renderer.render();
		if (callback) {
			callback();
		}
	}

	filter(text) {
		this.filterText = text;
		this.currentSuggestions = this.filterStrategy(text);
		this.renderer.render();
	}

	selectItem(index) {
		const command = this.currentSuggestions[index];
		this.dispatch(Dialog.ITEM_SELECTED, command);
	}
}