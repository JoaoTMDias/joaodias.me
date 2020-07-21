import { css, FlattenSimpleInterpolation } from "styled-components";
import { rem } from "polished";
import { RESPONSIVE_HEADING, EHeadingSize } from "../data/constants/headings";

interface IFluidTypeProps {
	minFont: number;
	maxFont: number;
	minScreen: number;
	maxScreen: number;
	units?: string;
}

/**
 * Returns a fluid typographic font-size, that scales between a
 * minimum and a maximum screen, as well as a minimum and a maximum font.
 *
 * @export
 * @param {IFluidTypeProps} params
 * @returns {string}
 */
export function fluidType({ minFont, maxFont, minScreen, maxScreen, units = "px" }: IFluidTypeProps): string {
	const result = `calc(${minFont}${units} + ${maxFont - minFont} * (100vw - ${minScreen}${units}) / ${
		maxScreen - minScreen
	})`;

	return result;
}

/**
 * Returns a pre-defined heading font-size declaration.
 *
 * It ranges from small to large.
 *
 * @example <caption>Calling the small h4.</caption>
 * responsiveHeading(EHeadingSize.SMALL, 4);
 *
 * @export
 * @param {EHeadingSize} size
 *  @param {number} position
 * @returns {FlattenSimpleInterpolation}
 */
export function responsiveHeading(size: EHeadingSize, position: number): FlattenSimpleInterpolation {
	const entry = RESPONSIVE_HEADING[size];
	const value = entry[position > 0 ? position - 1 : position];
	const fontSizeValue = rem(`${value}px`);

	return css`
		font-size: ${fontSizeValue};
	`;
}

export default fluidType;
