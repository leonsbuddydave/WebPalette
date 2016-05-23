class CommandRunner {
	constructor(storage) {
		this.storage = storage;

		let suspendedCommand = storage.get('suspendedCommand');
		console.log(suspendedCommand);

		if (suspendedCommand) {
			suspendedCommand = JSON.parse(suspendedCommand);
			let command = suspendedCommand.command;
			let nextStepIndex = parseInt(suspendedCommand.nextStepIndex, 10);
			storage.clear('suspendedCommand');
			this.run( command, nextStepIndex );
		}
	}

	suspendCommand(command, nextStepIndex) {
		this.storage.set('suspendedCommand', JSON.stringify({
			command: command,
			nextStepIndex: nextStepIndex
		}));
	}

	run(command, fromStep = 0) {
		let remainingSteps = command.steps.slice(fromStep);
		remainingSteps.some((step, index) => {
			switch (step.type) {
				case 'SIMULATE_CLICK':
					var element = document.querySelector(step.data.selector);
					element.click();
					break;
				case 'NAVIGATE':
					window.location.href = step.data.destination;
					break;
				case 'WAIT_FOR_REFRESH':
					this.suspendCommand(command, (index + 1) + '');
					return true;
					break;
				default:
					console.log('Unknown type');
			}
		});
	}
}