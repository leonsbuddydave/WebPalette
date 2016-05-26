class FreeformInputStep {
	run(config, locals, callback) {
		let d = new Dialog( (item) => {
			return [item];
		});
		d.toggle();

		d.subscribe(Dialog.ITEM_SELECTED, (item) => {
			locals[config.id] = item;
			d.toggle(callback);
		});
	}
}