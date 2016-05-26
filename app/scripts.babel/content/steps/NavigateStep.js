class NavigateStep {
	run(config, locals, callback) {
		window.location.href = config.destination;
		callback();
	}
}