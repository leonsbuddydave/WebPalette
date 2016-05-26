class OptionInputStep {
	run(config, locals, callback) {
		let d = new Dialog( () => {
			return config.options;
		});
		d.toggle();

		d.subscribe(Dialog.ITEM_SELECTED, (item) => {
			locals[config.id] = item;
			d.toggle(callback);
		});
	}
}