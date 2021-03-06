import SimulateClickStep from './steps/SimulateClickStep';
import NavigateStep from './steps/NavigateStep';
import FreeformInputStep from './steps/FreeformInputStep';
import OptionInputStep from './steps/OptionInputStep';

/**
 * Catalogs and returns Step instances based on type.
 */
export default class StepFactory {
	constructor() {
		this.steps = {};
		this.steps['SIMULATE_CLICK'] = new SimulateClickStep();
		this.steps['NAVIGATE'] = new NavigateStep();
		this.steps['FREEFORM_INPUT'] = new FreeformInputStep();
		this.steps['OPTION_INPUT'] = new OptionInputStep();
	};

	/**
	 * Returns an appropriate Step instance based on provided type.
	 * @param  {string} type The type to look up
	 * @return {Step}      A runnable Step-type object
	 */
	getStep(type) {
		return this.steps[type];
	}
}