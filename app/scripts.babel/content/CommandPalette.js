class CommandPalette {
	constructor(commandMap, commandRunner, conditionEvaluator) {
		this.commandMap = commandMap;
		this.commandRunner = commandRunner;
		this.conditionEvaluator = conditionEvaluator;
		this.currentSuggestions = [];
		this.visible = false;
		this.commandFilter = '';
		this.renderer = new CommandPaletteRenderer(this);
	}

	setCommandMap(commandMap) {
		this.commandMap = commandMap;
		this.updateSuggestions(this.commandFilter);
	}

	toggle(callback) {
		this.visible = !this.visible;
		this.renderer.render();
		if (callback) callback();
	}

	updateSuggestions(inputValue) {
		this.commandFilter = inputValue;
		this.currentSuggestions = this.commandMap.commands.filter((com) => {
			let matches = true;
			matches &= com.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
			matches &= this.conditionEvaluator.check(com.conditions);
			return matches;
		});
		this.renderer.render();
	}

	invokeCommand(index) {
		// Hide the palette before running the command
		// to avoid interfering with page interactions
		this.toggle(() => {
			const command = this.currentSuggestions[index];
			this.commandRunner.run(command);			
		});
	}
}