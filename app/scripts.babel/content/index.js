'use strict';

import CommandMapFactory from './CommandMapFactory';
import CommandPalette from './CommandPalette';
import CommandRunner from './CommandRunner';
import ConditionEvaluator from './ConditionEvaluator';
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