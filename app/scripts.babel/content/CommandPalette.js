import Dialog from './Dialog';
import FuzzyFilterStrategy from './FuzzyFilterStrategy';

export default class CommandPalette {
	constructor(commandMap) {
		this.commandMap = commandMap;

		this.dialog = new Dialog(new FuzzyFilterStrategy(() => {
			return this.commandMap.getCommands();
		}));
		this.dialog.subscribe(Dialog.ITEM_SELECTED, (selection) => {
			this.toggle(() => {
				console.log(selection);
				selection.run();
				// this.commandMap.runCommand(selection);
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