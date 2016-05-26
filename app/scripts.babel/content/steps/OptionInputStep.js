/**
 * Opens up a command-style dialog and
 * provides a list of options to choose from
 *
 * Config:
 * 	{string} question: Help text to include alongside the dialog
 * 	{string} id: The key to store the returned value against in locals
 * 	{Array} options: The list of options provided to the user to choose from
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