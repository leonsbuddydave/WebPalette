(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommandPalette = function () {
	function CommandPalette(commandMap, commandRunner, conditionEvaluator) {
		var _this = this;

		_classCallCheck(this, CommandPalette);

		this.commandMap = commandMap;
		this.commandRunner = commandRunner;
		this.conditionEvaluator = conditionEvaluator;

		this.dialog = new Dialog(this.getCommandSuggestions.bind(this));
		this.dialog.subscribe(Dialog.ITEM_SELECTED, function (selection) {
			_this.toggle(function () {
				_this.commandRunner.run(selection.data, selection.data.globals);
			});
		}, this);
	}

	_createClass(CommandPalette, [{
		key: "getCommandSuggestions",
		value: function getCommandSuggestions(filterText) {
			var _this2 = this;

			return this.commandMap.getCommands().filter(function (com) {
				var name = com.name.toLowerCase();
				var text = filterText.toLowerCase();
				var matches = name.includes(text);
				matches &= _this2.conditionEvaluator.check(com.conditions);
				return matches;
			}).map(function (com) {
				return {
					label: com.name,
					data: com
				};
			});
		}
	}, {
		key: "setCommandMap",
		value: function setCommandMap(commandMap) {
			this.commandMap = commandMap;
			this.updateSuggestions(this.commandFilter);
		}
	}, {
		key: "toggle",
		value: function toggle(callback) {
			this.dialog.toggle(callback);
		}
	}]);

	return CommandPalette;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _CommandPalette = require('./CommandPalette');

var _CommandPalette2 = _interopRequireDefault(_CommandPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./CommandPalette":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXHNjcmlwdHMuYmFiZWxcXGNvbnRlbnRcXENvbW1hbmRQYWxldHRlLmpzIiwiYXBwXFxzY3JpcHRzLmJhYmVsXFxjb250ZW50XFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztJQ0FNLGM7QUFDTCx5QkFBWSxVQUFaLEVBQXdCLGFBQXhCLEVBQXVDLGtCQUF2QyxFQUEyRDtBQUFBOztBQUFBOztBQUMxRCxPQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxPQUFLLGtCQUFMLEdBQTBCLGtCQUExQjs7QUFFQSxPQUFLLE1BQUwsR0FBYyxJQUFJLE1BQUosQ0FBVyxLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQWdDLElBQWhDLENBQVgsQ0FBZDtBQUNBLE9BQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsT0FBTyxhQUE3QixFQUE0QyxVQUFDLFNBQUQsRUFBZTtBQUMxRCxTQUFLLE1BQUwsQ0FBWSxZQUFNO0FBQ2pCLFVBQUssYUFBTCxDQUFtQixHQUFuQixDQUF1QixVQUFVLElBQWpDLEVBQXVDLFVBQVUsSUFBVixDQUFlLE9BQXREO0FBQ0EsSUFGRDtBQUdBLEdBSkQsRUFJRyxJQUpIO0FBS0E7Ozs7d0NBRXFCLFUsRUFBWTtBQUFBOztBQUNqQyxVQUFPLEtBQUssVUFBTCxDQUFnQixXQUFoQixHQUE4QixNQUE5QixDQUFxQyxVQUFDLEdBQUQsRUFBUztBQUNwRCxRQUFJLE9BQU8sSUFBSSxJQUFKLENBQVMsV0FBVCxFQUFYO0FBQ0EsUUFBSSxPQUFPLFdBQVcsV0FBWCxFQUFYO0FBQ0EsUUFBSSxVQUFVLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBZDtBQUNBLGVBQVcsT0FBSyxrQkFBTCxDQUF3QixLQUF4QixDQUE4QixJQUFJLFVBQWxDLENBQVg7QUFDQSxXQUFPLE9BQVA7QUFDQSxJQU5NLEVBTUosR0FOSSxDQU1BLFVBQUMsR0FBRCxFQUFTO0FBQ2YsV0FBTztBQUNOLFlBQU8sSUFBSSxJQURMO0FBRU4sV0FBTTtBQUZBLEtBQVA7QUFJQSxJQVhNLENBQVA7QUFZQTs7O2dDQUVhLFUsRUFBWTtBQUN6QixRQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxRQUFLLGlCQUFMLENBQXVCLEtBQUssYUFBNUI7QUFDQTs7O3lCQUVNLFEsRUFBVTtBQUNoQixRQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFFBQW5CO0FBQ0E7Ozs7Ozs7OztBQ3BDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBDb21tYW5kUGFsZXR0ZSB7XHJcblx0Y29uc3RydWN0b3IoY29tbWFuZE1hcCwgY29tbWFuZFJ1bm5lciwgY29uZGl0aW9uRXZhbHVhdG9yKSB7XHJcblx0XHR0aGlzLmNvbW1hbmRNYXAgPSBjb21tYW5kTWFwO1xyXG5cdFx0dGhpcy5jb21tYW5kUnVubmVyID0gY29tbWFuZFJ1bm5lcjtcclxuXHRcdHRoaXMuY29uZGl0aW9uRXZhbHVhdG9yID0gY29uZGl0aW9uRXZhbHVhdG9yO1xyXG5cclxuXHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzLmdldENvbW1hbmRTdWdnZXN0aW9ucy5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuZGlhbG9nLnN1YnNjcmliZShEaWFsb2cuSVRFTV9TRUxFQ1RFRCwgKHNlbGVjdGlvbikgPT4ge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZSgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5jb21tYW5kUnVubmVyLnJ1bihzZWxlY3Rpb24uZGF0YSwgc2VsZWN0aW9uLmRhdGEuZ2xvYmFscyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXRDb21tYW5kU3VnZ2VzdGlvbnMoZmlsdGVyVGV4dCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tbWFuZE1hcC5nZXRDb21tYW5kcygpLmZpbHRlcigoY29tKSA9PiB7XHJcblx0XHRcdGxldCBuYW1lID0gY29tLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0bGV0IHRleHQgPSBmaWx0ZXJUZXh0LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGxldCBtYXRjaGVzID0gbmFtZS5pbmNsdWRlcyh0ZXh0KTtcclxuXHRcdFx0bWF0Y2hlcyAmPSB0aGlzLmNvbmRpdGlvbkV2YWx1YXRvci5jaGVjayhjb20uY29uZGl0aW9ucyk7XHJcblx0XHRcdHJldHVybiBtYXRjaGVzO1xyXG5cdFx0fSkubWFwKChjb20pID0+IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRsYWJlbDogY29tLm5hbWUsXHJcblx0XHRcdFx0ZGF0YTogY29tXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c2V0Q29tbWFuZE1hcChjb21tYW5kTWFwKSB7XHJcblx0XHR0aGlzLmNvbW1hbmRNYXAgPSBjb21tYW5kTWFwO1xyXG5cdFx0dGhpcy51cGRhdGVTdWdnZXN0aW9ucyh0aGlzLmNvbW1hbmRGaWx0ZXIpO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlKGNhbGxiYWNrKSB7XHJcblx0XHR0aGlzLmRpYWxvZy50b2dnbGUoY2FsbGJhY2spO1xyXG5cdH1cclxufSIsImltcG9ydCBDb21tYW5kUGFsZXR0ZSBmcm9tICcuL0NvbW1hbmRQYWxldHRlJzsiXX0=
