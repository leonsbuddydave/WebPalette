import Dialog from './Dialog';

export default class CommandPalette {
	constructor(commandMap, commandRunner) {
		this.commandMap = commandMap;
		this.commandRunner = commandRunner;

		this.dialog = new Dialog(this.getCommandSuggestions.bind(this));
		this.dialog.subscribe(Dialog.ITEM_SELECTED, (selection) => {
			this.toggle(() => {
				this.commandMap.runCommand(selection.data);
				// this.commandRunner.run(selection.data, selection.data.globals);
			});
		}, this);
	}

	getCommandSuggestions(filterText) {
		return this.commandMap.getCommands().filter((com) => {
			let name = com.toLowerCase();
			let text = filterText.toLowerCase();
			let matches = name.includes(text);
			return matches;
		}).map((com) => {
			return {
				label: com,
				data: com
			}
		});
	}

	setCommandMap(commandMap) {
		this.commandMap = commandMap;
		this.updateSuggestions(this.commandFilter);
	}

	toggle(callback) {
		this.dialog.toggle(callback);
	}
}