export default class Utils {
	static copy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
}