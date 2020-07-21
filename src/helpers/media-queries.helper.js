import { css } from "styled-components";

/**
 * For the specified media query, returns a tag function that can be used to
 * automatically wrap the tagged template literal in its media query.
 *
 * @param {string} query The string or template literal containing the media
 *   query features.
 */

const breakpoints = {
	medium: 640,
	large: 1024,
	xlarge: 1200,
	xxlarge: 1440,
};

const mediaQuery = (...query) => (...rules) => css`
	@media ${css(...query)} {
		${css(...rules)}
	}
`;

const DEFAULT_FONT_SIZE = 16;

const above = {
	medium: mediaQuery`(min-width: ${breakpoints.medium / DEFAULT_FONT_SIZE}rem)`,
	large: mediaQuery`(min-width: ${breakpoints.large / DEFAULT_FONT_SIZE}rem)`,
	xlarge: mediaQuery`(min-width: ${breakpoints.medium / DEFAULT_FONT_SIZE}rem)`,
	xxlarge: mediaQuery`(min-width: ${breakpoints.xxlarge / DEFAULT_FONT_SIZE}rem)`,
};

const below = {
	medium: mediaQuery`(max-width: ${breakpoints.medium / DEFAULT_FONT_SIZE}rem)`,
	large: mediaQuery`(max-width: ${breakpoints.large / DEFAULT_FONT_SIZE}rem)`,
	xlarge: mediaQuery`(max-width: ${breakpoints.medium / DEFAULT_FONT_SIZE}rem)`,
	xxlarge: mediaQuery`(max-width: ${breakpoints.xxlarge / DEFAULT_FONT_SIZE}rem)`,
};

export { mediaQuery, above, below };
