export default class CommandMapComposite {
	
	constructor(commandMaps) {
		this.commandMaps = commandMaps;
		this.commands = commandMaps.reduce((map1, map2) => {
			return map1.commands.concat(map2.commands);
		});
	}

	getCommands() {
		return this.commands;
	}
}