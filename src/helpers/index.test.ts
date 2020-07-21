import { fluidType, responsiveHeading, Logger } from "./index";
import { EHeadingSize } from "../data/constants/headings";
import { logType } from "./logger.helper";

describe("Helpers", () => {
	describe("fluidType", () => {
		it("should return a calc string", () => {
			const result = fluidType({
				minFont: 16,
				maxFont: 24,
				minScreen: 375,
				maxScreen: 1024,
				units: "px",
			});

			const expected = "calc(16px + 8 * (100vw - 375px) / 649)";

			expect(typeof result).toBe("string");
			expect(result).toBe(expected);
		});
	});

	describe("responsiveHeading", () => {
		it("should return a font-size string", () => {
			const result = responsiveHeading(EHeadingSize.LARGE, 0);

			expect(result[1]).toBe("2.5rem");
		});
	});

	describe("Logger", () => {
		/**
		 * Tests the console output for the Logger function
		 *
		 * @param {logType} type
		 * @param {string} [message="default message"]
		 * @param {boolean} [showOnProduction]
		 * @returns
		 */
		function testConsole(type: logType, message = "default message", showOnProduction?: boolean) {
			const result = Logger({
				type,
				message,
				showOnProduction,
			});

			return {
				result,
			};
		}

		it("should return null if it isn't supposed to show on production", () => {
			const type: logType = "log";
			const { result } = testConsole(type, "custom message", false);

			expect(result).toBeNull();
		});

		it("should return a console log (default)", () => {
			const type: logType = "log";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});

		it("should return a console info", () => {
			const type: logType = "info";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});

		it("should return a console warn", () => {
			const type: logType = "warning";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});

		it("should return a console error", () => {
			const type: logType = "error";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});

		it("should return a console time", () => {
			const type: logType = "time";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});

		it("should return a console timeEnd", () => {
			const type: logType = "timeEnd";
			const { result } = testConsole(type);

			expect(result).toBe(type);
		});
	});
});
