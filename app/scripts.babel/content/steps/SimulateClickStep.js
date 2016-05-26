/**
 * Simulates a click on an element matching
 * the provided selector.
 */
class SimulateClickStep {
	run(config, locals, callback) {
		let element = document.querySelector(config.selector);
		element.click();
		callback();
	}
}