class SimulateClickStep {
	run(config, locals, callback) {
		let element = document.querySelector(config.selector);
		element.click();
		callback();
	}
}