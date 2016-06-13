import StepFactory from './StepFactory';

export default class CommandRunner {
	constructor(storage) {
		this.storage = storage;
		this.stepFactory = new StepFactory();

		let suspendedCommand = storage.get('suspendedCommand');
		console.log('Suspended command', suspendedCommand);

		if (suspendedCommand) {
			suspendedCommand = JSON.parse(suspendedCommand);
			let command = suspendedCommand.command;
			let locals = suspendedCommand.locals;
			let nextStepIndex = parseInt(suspendedCommand.nextStepIndex, 10);
			storage.clear('suspendedCommand');
			this.run( command, locals, nextStepIndex );
		}
	}

	/**
	 * Persists step data about this command to be picked up after the next page
	 * load.
	 * @param  {Command} command       The object containing command data.
	 * @param  {Object} locals         Map of variables to be passed to the next step
	 * @param  {Number} nextStepIndex  Index of the next step within this command
	 */
	suspendCommand(command, locals, nextStepIndex) {
		this.storage.set('suspendedCommand', JSON.stringify({
			command: command,
			locals: locals,
			nextStepIndex: nextStepIndex
		}));
	}

	/**
	 * Runs the given command under the set of provided locals,
	 * starting at the provided step index.
	 * @param  {Command} command  The command to run
	 * @param  {Object} locals   	The local variables available to the command
	 * @param  {Number} fromStep  The step index to start at in the command
	 */
	run(command, locals = {}, fromStep = 0) {
		let remainingSteps = command.steps.slice(fromStep);

		if (remainingSteps.length === 0) {
			return;
		}

		let nextStep = remainingSteps[0];

		if (nextStep.type === 'WAIT_FOR_REFRESH') {
			// Special step type for waiting for refresh
			this.suspendCommand(command, locals, (fromStep + 1) + '');
		} else {
			// Create a clone data object with template parameters
			// filled in from local object
			let data = {};
			for (let key of Object.keys(nextStep.data)) {
				// Temporarily strings only
				if (typeof nextStep.data[key] === 'string') {
					data[key] = Mustache.render( nextStep.data[key], locals );	
				} else {
					data[key] = nextStep.data[key];
				}
			}

			// Get and run a step based on type
			this.stepFactory.getStep(nextStep.type).run(data, locals, () => {
				this.run(command, locals, fromStep + 1);
			});
		}
	}
}