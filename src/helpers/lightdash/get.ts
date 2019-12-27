/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
 *
 * @export
 * @template T
 * @param {(T | any)} object
 * @param {(string | string[])} path
 * @param {*} [value]
 * @returns {*}
 */
export function get<T>(object: T | any, path: string | string[], value?: any): any {
	// If path is not defined or it has false value
	if (!path) return undefined;

	// Check if path is string or array. Regex : ensure that we do not have '.' and brackets
	const pathArray = Array.isArray(path) ? path : path.split(/[,[\].]/g).filter(Boolean);

	// Find value if exist return otherwise return undefined value;
	return pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object) || value;
}

export default get;
