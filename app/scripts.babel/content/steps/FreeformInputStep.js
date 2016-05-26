/**
 * Opens a command-style dialog
 * and accepts freeform text input
 *
 * Config:
 * 	{string} question: Help text to include alongside the dialog
 * 	{string} id: The key to store the returned value against in locals
 */
class FreeformInputStep {
	run(config, locals, callback) {
		let d = new Dialog( (item) => {
			return [item];
		});
		d.toggle();
		d.enableFreeformText(true);

		d.subscribe(Dialog.ITEM_SELECTED, (item) => {
			locals[config.id] = item;
			d.toggle(callback);
		});
	}
}