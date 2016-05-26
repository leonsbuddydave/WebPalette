/**
 * Opens up a command-style dialog and
 * provides a list of options to choose from
 */
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