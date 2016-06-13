export default class ConditionEvaluator {
	check(conditions = []) {
		return conditions.every((condition) => {

			switch (condition.type) {
				case 'ELEMENT_EXISTS':
					let el = document.querySelector(condition.data.selector);
					return el !== null;
					break;
				default:
					throw new Error('Unknown condition type!');
			}
		});
	}
}