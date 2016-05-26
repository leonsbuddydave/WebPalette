class CommandPalette {
	constructor(commandMap, commandRunner, conditionEvaluator) {
		this.commandMap = commandMap;
		this.commandRunner = commandRunner;
		this.conditionEvaluator = conditionEvaluator;

		this.dialog = new Dialog(this.getCommandSuggestions.bind(this));
		this.dialog.subscribe(Dialog.ITEM_SELECTED, (selection) => {
			this.toggle(() => {
				this.commandRunner.run(selection.data, commandMap.globals);
			});
		}, this);
	}

	getCommandSuggestions(filterText) {
		return this.commandMap.commands.filter((com) => {
			let name = com.name.toLowerCase();
			let text = filterText.toLowerCase();
			let matches = name.includes(text);
			matches &= this.conditionEvaluator.check(com.conditions);
			return matches;
		}).map((com) => {
			return {
				label: com.name,
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