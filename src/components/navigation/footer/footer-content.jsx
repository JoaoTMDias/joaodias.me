// Libraries
import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../../helpers/media-queries.helper";

/** ********
 ** Component: FooterCopyright
 ** @type: functional stateless component
 ** @description: Copyright on Bottom
 ********* */
const FooterContent = () => (
	<Wrapper className="layout__container">
		<div className="layout__row">
			<div className="left">
				<ul className="list">
					<li className="item">
						<Link to="/">Homepage</Link>
					</li>
					<li className="item">
						<Link to="/about/">About</Link>
					</li>
					<li className="item">
						<Link to="/contact/">Contact</Link>
					</li>
				</ul>
			</div>
			<div className="right">
				<ul className="list">
					<li className="item">
						<Link to="/privacy-policy/">Privacy Policy</Link>
					</li>
					<li className="item">
						<p>{new Date().getFullYear()} &copy; João Dias. All Rights Reserved</p>
					</li>
				</ul>
			</div>
		</div>
	</Wrapper>
);

// Styled
const Wrapper = styled.div`
	width: 100%;
	position: relative;
	background-color: transparent;
	height: auto;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	padding-top: var(--global-padding);
	padding-bottom: var(--global-padding);

	margin-top: ${rem("48px")} !important;
	margin-right: auto;
	margin-bottom: 0;
	margin-left: auto;

	.layout__row {
		width: 100%;
		margin: 0 auto;
		justify-content: space-between;
		flex-direction: column;
		display: flex;
		margin-bottom: var(--navbar-height);

		${above.medium`
      flex-direction: row;
      margin-bottom: 0;
    `};
	}

	.left {
		color: var(--color-gray8, #646b82);
		text-align: center;
		justify-content: center;

		${above.large`
      text-align: left;
      justify-content: flex-start;
    `};
	}

	.right {
		flex-direction: column;
		text-align: center;

		${above.large`
      text-align: right;
      align-items: flex-end;
    `};
	}

	.left,
	.right {
		font-family: var(--body-font-family);
		letter-spacing: 0;
		text-align: center;
		font-size: ${rem("12px")};
		margin-top: var(--global-margin);
		margin-bottom: var(--global-margin);
		width: 100%;
		display: flex;

		${above.medium`
      width: 50%;
    `};

		a,
		p {
			line-height: ${rem("48px")};
			width: 100%;

			${above.medium`
              line-height: ${rem("64px")};
      `};
		}

		a {
			color: var(--color-gray9, #3a3e4c);
		}

		p {
			color: var(--color-gray8, #646b82);
			flex-wrap: wrap;
		}

		li {
			margin-left: var(--global-margin);
			margin-right: var(--global-margin);
		}
	}

	.list {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		margin: 0;

		${above.large`
      flex-direction: row;
    `};

		.item {
			flex-wrap: wrap;
			color: var(--color-gray8, #646b82);

			a {
				color: var(--color-gray8, #646b82);

				&:focus {
					background-color: var(--color-alternate);
					color: var(--color-white);
				}
			}
		}
	}
`;

export default FooterContent;
