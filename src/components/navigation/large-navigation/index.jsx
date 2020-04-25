// Libraries
import React from "react";
import { Link } from "gatsby";
import { Wrapper, Item, List } from "./styles";

/**
 *  Large Navigation Menu
 *
 * @component LargeNavigation
 */
export const LargeNavigation = () => (
	<Wrapper id="top-navigation" title="Top Navigation">
		<List>
			<Item>
				<Link
					className="large-nav__link"
					to="/about/"
					aria-label="Go to the about page"
					activeClassName="active"
					title="Go to the about page"
				>
					About
				</Link>
			</Item>

			<Item>
				<Link
					className="large-nav__link"
					to="/contact/"
					aria-label="Go to the contacts page"
					activeClassName="active"
					title="Go to the contacts page"
				>
					Contact
				</Link>
			</Item>
		</List>
	</Wrapper>
);

export default LargeNavigation;
