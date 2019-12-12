// Libraries
import React, { Component } from "react";
import styled from "styled-components";
import { rem } from "polished";

// Components
import HeaderPageTitle from "./header-page-title";
import BackNavigation from "./back-navigation";
import { Branding, SocialNavigation } from "../../index";
import LargeNavigation from "../large-navigation";

// Styles
import { above } from "../../../helpers/media-queries.helper";

// Utility functions
const getScrollPosition = (el = window) => ({
	y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
};

/**
 * Page Header
 *
 * @class Header
 * @extends {React.Component}
 */
export class Header extends Component {
	constructor(props) {
		super(props);

		// example how to bind object in React ES6
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		document.addEventListener("scroll", debounce(this.handleScroll, 16));
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", debounce(this.handleScroll, 16));
	}

	/**
	 * Handles the scrolling distance and the fixed-nav functionality
	 *
	 * @returns
	 * @memberof Header
	 */
	handleScroll() {
		const nav = document.querySelector(".utilities--above-the-fold");
		const body = document.body || document.documentElement;
		if (nav) {
			const ScrollPosition = getScrollPosition();
			if (ScrollPosition.y >= 64) {
				body.classList.add("fixed-nav");
			} else if (ScrollPosition.y < 64) {
				body.classList.remove("fixed-nav");
			}
		}

		return false;
	}

	render() {
		return (
			<Wrapper id="page-header" className="header">
				<div key="header" className="layout__row header__row">
					<Branding />
					<BackNavigation />
					<HeaderPageTitle />
					<LargeNavigation />
					<SocialNavigation />
				</div>
			</Wrapper>
		);
	}
}

const Wrapper = styled.header`
	background-color: transparent;
	max-height: var(--navbar-height);
	z-index: 100;
	position: fixed;
	width: 100%;
	top: 0;

	${above.large`
    background-color: transparent;
    margin-top: ${rem("24px")};
    position: relative;
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
