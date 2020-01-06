/**
 * Splits string by separator.
 *
 * @export
 * @param {string} str
 * @param {(RegExp | string)} separator
 * @param {number} [limit]
 * @returns {string[]}
 */
export function split(str: string, separator: RegExp | string, limit?: number): string[] {
	return limit ? str.split(separator).slice(0, limit) : str.split(separator);
}

export default split;
