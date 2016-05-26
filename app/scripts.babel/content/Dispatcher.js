/**
 * Event dispatching utility parent class
 */
class Dispatcher {
	
	constructor() {
		this.subscriptions = {};
	}

	/**
	 * Subscribes a callback to be invoked on an event broadcast.
	 * @param  {string}   name     The name of the event to subscribe to
	 * @param  {Function} callback The callback to invoke on the event
	 * @param  {Object}   context  The context to run the callback in
	 */
	subscribe(name, callback, context) {
		if (!this.subscriptions[name]) {
			this.subscriptions[name] = [];
		}
		this.subscriptions[name].push({
			callback: callback,
			context: context
		});
	}

	/**
	 * Dispatches an event to all subscribed callbacks
	 * @param  {string} name The name of the event to dispatch
	 * @param  {Object} data A data payload to include with the event
	 */
	dispatch(name, data) {
		if (!this.subscriptions[name]) {
			return;
		} else {
			this.subscriptions[name].forEach((sub) => {
				sub.callback.call(sub.context, data);
			});
		}
	}
}