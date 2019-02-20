import {
    css
} from 'styled-components'

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
}

const mediaQuery = (...query) => (...rules) => css `
    @media ${css(...query)} {
        ${css(...rules)}
    }
`;

const above = {
    medium: mediaQuery `(min-width: ${breakpoints.medium / 16}rem)`,
    large: mediaQuery `(min-width: ${breakpoints.large / 16}rem)`,
    xlarge: mediaQuery `(min-width: ${breakpoints.medium / 16}rem)`,
    xxlarge: mediaQuery `(min-width: ${breakpoints.xxlarge / 16}rem)`,
};

const below = {
    medium: mediaQuery `(max-width: ${breakpoints.medium / 16}rem)`,
    large: mediaQuery `(max-width: ${breakpoints.large / 16}rem)`,
    xlarge: mediaQuery `(max-width: ${breakpoints.medium / 16}rem)`,
    xxlarge: mediaQuery `(max-width: ${breakpoints.xxlarge / 16}rem)`,
};

export {
    mediaQuery,
    above,
    below
}