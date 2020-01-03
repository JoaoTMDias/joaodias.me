// Libraries
import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { rem } from "polished";

// Components
// import Component from '../components/componentName';

/** ********
 ** Component: BackNavigation
 ** @type: functional stateless component
 ** @description: Back Button for Fullscreen apps
 ********* */
const BackNavigation = () => {
	return (
		<Wrapper id="back-navigation" aria-label="Back Navigation Button">
			<Link to="/" aria-label="Go back to the home page">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-labelledby="back-navigation-title">
					<title id="back-navigation-title">Navigate Back to the Homepage</title>
					<path className="back__navigation__wrapper" fill="none" d="M0 0h48v48H0z" />
					<path
						fill="var(--back-navigation-fill)"
						className="back__navigation__arrow"
						d="M40 22H15.66l11.17-11.17L24 8 8 24l16 16 2.83-2.83L15.66 26H40z"
					/>
				</svg>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.nav`
	display: none;
	justify-content: center;
	align-items: center;
	width: ${rem("48px")};
	height: ${rem("48px")};

	a,
	svg {
		display: flex;
		justify-content: center;
		align-items: center;
		width: ${rem("36px")};
		height: ${rem("36px")};
	}
`;

export default BackNavigation;
