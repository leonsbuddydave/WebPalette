import ActionAPI from './ActionAPI';
import Session from './Session';

export default class CommandMap {
	constructor(config) {
		this.config = window.eval(config);
		this.commands = Object.keys(this.config);
		this.session = new Session();

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
			this.session.setValue('CURRENT_ACTION', commandName);
			command.action(new ActionAPI(), new Session());
			this.session.removeValue('CURRENT_ACTION');
		}
	}
}