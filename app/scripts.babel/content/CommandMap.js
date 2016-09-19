import ActionAPI from './ActionAPI';
import Session from './Session';
import Utils from './Utils';
import Command from './Command';

export default class CommandMap {
	constructor(config) {

		this.session = new Session();
		this.commandsById = {};
		config.maps.forEach( (map) => {
			var contents = window.eval(map.contents);

			Object.keys(contents).forEach( (commandName) => {
				var id = map.metadata.name + ' ' + commandName;
				var definition = contents[commandName];
				var command = new Command(commandName, definition, id, this.session);
				this.addCommand(command);
			});
		});

		this.commands = Object.values(this.commandsById);

		let actionInProgress = this.session.getValue('ACTION_IN_PROGRESS');
		if (actionInProgress) {
			this.session.removeValue('ACTION_IN_PROGRESS');
			this.runCommand(actionInProgress);
		}
	}

	/**
	 * Returns currently available commands
	 * @return {Array} List of available commands
	 */
	getCommands() {
		return this.commands.filter((command) => {
			return command.isAvailable();
		});
	}

	getCommandById(id) {
		return this.commandsById[id] || null;
	}

	addCommand(command) {
		this.commandsById[command.getId()] = command;
	}

	runCommand(id) {
		var command = this.commandsById[id];
		command.run();
	}
}