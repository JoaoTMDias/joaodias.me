// Libraries
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { rem } from "polished";

// Components
import HeaderPageTitle from "./header-page-title";
import BackNavigation from "./back-navigation";
import { LargeNavigation } from "../large-navigation";

// Styles
import { above } from "../../../helpers/media-queries.helper";
import { SocialNavigation } from "../social-navigation/social-navigation.component";
import { Branding } from "../../branding";

/**
 * Page Header
 *
 * @class Header
 * @extends {React.Component}
 */
export const Header: FunctionComponent = () => {
	return (
		<Wrapper id="page-header" className="header">
			<div className="layout__row header__row">
				<Branding />
				<BackNavigation />
				<HeaderPageTitle />
				<LargeNavigation />
				<SocialNavigation />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.header`
	position: sticky;
	background-color: var(--color-white);
	max-height: var(--navbar-height);
	z-index: 100;
	width: 100%;
	top: 0;

	${above.large`
    background-color: transparent;
    margin-top: ${rem("24px")};
  `};

	.header__row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		max-height: var(--navbar-height);
	}
`;

export default Header;
