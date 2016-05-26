/**
 * Simulates a click on an element matching
 * the provided selector.
 *
 * Config:
 * 	{string} selector: The DOM selector to find the element with
 */
class SimulateClickStep {
	run(config, locals, callback) {
		let element = document.querySelector(config.selector);
		element.click();
		callback();
	}
}