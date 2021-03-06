'use strict';

import CommandMapFactory from './CommandMapFactory';
import CommandPalette from './CommandPalette';
import CommandRunner from './CommandRunner';
import Dispatcher from './Dispatcher';
import Dialog from './Dialog';
import Storage from './Storage';
import CommandMapComposite from './CommandMapComposite';
import DialogRenderer from './DialogRenderer';
import StepFactory from './StepFactory';
import Utils from './Utils';
import FreeformInputStep from './steps/FreeformInputStep';
import NavigateStep from './steps/NavigateStep';
import OptionInputStep from './steps/OptionInputStep';
import SimulateClickStep from './steps/SimulateClickStep';
import Session from './Session';

const APP = {};

const cmf = new CommandMapFactory();
console.info('Retrieving map for href: ' + location.href);
cmf.getByUrl(location.href, (map) => {
	console.log(map);
	if (map !== null) {
		APP.palette = new CommandPalette(
			map,
			new CommandRunner(new Storage())
		);
	}
});

window.addEventListener('keydown', (e) => {
	if (e.shiftKey && e.ctrlKey && e.keyCode === 69) {
		if (APP.palette) {
			Dialog.clearCurrentDialog();
			APP.palette.toggle();	
		} else {
			
		}
	}
});