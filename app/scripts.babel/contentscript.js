'use strict';

console.log('\'Allo \'Allo! Content script');

const APP = {};

const cmf = new CommandMapFactory();
cmf.getByHost(location.host, (map) => {
	if (map !== null) {
		APP.palette = new CommandPalette(
			map,
			new CommandRunner(new Storage()),
			new ConditionEvaluator()
		);
	}
});

window.addEventListener('keydown', (e) => {
	if (e.shiftKey && e.ctrlKey && e.keyCode === 69) {
		if (APP.palette) {
			Dialog.clearCurrentDialog();
			APP.palette.toggle();	
		}
	}
});