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
import { SocialNavigation } from "../social-navigation/index";
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
	background-color: var(--color-white);
	max-height: var(--navbar-height);
	position: sticky;
	top: 0;
	width: 100%;
	z-index: 2;

	${above.large`
    margin-top: ${rem("24px")};
  `};

	.header__row {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		max-height: var(--navbar-height);
	}
`;

export default Header;
