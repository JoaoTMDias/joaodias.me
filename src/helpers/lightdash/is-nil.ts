/**
 * Checks if value is null or undefined.
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function isNil(value: any): boolean {
	return value == null;
}

export default isNil;
