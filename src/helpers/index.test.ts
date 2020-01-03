import { fluidType, responsiveHeading } from "./index";
import { EHeadingSize } from "../data/constants/headings";

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
});
