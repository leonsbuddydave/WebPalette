/**
 * Navigates the browser to a new URL. URL.
 *
 * Config:
 * 	{string} destination: The URL to navigate to
 */
class NavigateStep {
	run(config, locals, callback) {
		window.location.href = config.destination;
		callback();
	}
}