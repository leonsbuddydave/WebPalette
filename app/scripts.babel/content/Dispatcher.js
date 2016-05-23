class Dispatcher {
	
	constructor() {
		this.subscriptions = {};
	}

	subscribe(name, callback, context) {
		if (!this.subscriptions[name]) {
			this.subscriptions[name] = [];
		}

		this.subscriptions[name].push({
			callback: callback,
			context: context
		});
	}

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