class CommandMap {
	constructor(dataSource) {
		this.dataSource = dataSource;
		this.commands = dataSource.commands.map((command) => {
			command.globals = dataSource.globals;
			return command;
		});
	}

	getCommands() {
		return this.commands;
	}
}