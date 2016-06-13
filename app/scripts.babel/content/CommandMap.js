import ActionAPI from './ActionAPI';

export default class CommandMap {
	constructor(config) {
		this.config = window.eval(config);
		this.commands = Object.keys(this.config);
	}

	/**
	 * Returns currently available commands
	 * @return {Array} List of available commands
	 */
	getCommands() {
		return this.commands.filter((command) => {
			var showIf = this.config[command].showIf;
			if (showIf) {
				var show = showIf(new ActionAPI());
				if (!show) {
					return false;
				}
			}
			return true;
		});
	}

	runCommand(commandName) {
		var command = this.config[commandName];
		if (command && command.action) {
			command.action( new ActionAPI() );
		}
	}
}