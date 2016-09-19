import ActionAPI from './ActionAPI';
import Session from './Session';

export default class Command {
	constructor(name, definitions, id, session) {
		this.name = name;
		this.definitions = definitions;
		this.id = id;
		this.session = session;
	}

	run() {
		if (this.definitions.action) {
			this.session.setValue('CURRENT_ACTION', this.id);
			this.definitions.action(new ActionAPI(), new Session());
			this.session.removeValue('CURRENT_ACTION');
		}
	}

	getName() {
		return this.name;
	}

	getId() {
		return this.id;
	}

	isAvailable() {
		var showIf = this.definitions.showIf;
		if (showIf) {
			var show = showIf(new ActionAPI());
			if (!show) {
				return false;
			}
		}
		return true;
	}
}