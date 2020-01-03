/**
 * Import Libraries
 */
import React, { FunctionComponent } from "react";
import { Wrapper, List, Item, TabLink } from "./index.styles";

export const BottomNavigation: FunctionComponent = () => {
	return (
		<Wrapper id="bottom-navigation-bar">
			<List className="layout__row">
				<Item title="Go to Homepage">
					<TabLink
						to="/"
						data-testid="tab-link"
						activeClassName="is-active"
						aria-label="Click to go to the Homepage"
						tabIndex={0}
					>
						<figure className="link__icon" tabIndex={-1}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<title>Homepage Icon</title>
								<path
									className="link__filled"
									fill="var(--body-background, #ffffff)"
									d="M23.87 10.83L12 0 .13 10.83a.4.4 0 0 0 0 .58.43.43 0 0 0 .59 0L2.48 9.8V24H9.1v-7.58a2.9 2.9 0 0 1 5.8 0V24h6.62V9.8l1.78 1.63a.46.46 0 0 0 .29.11.43.43 0 0 0 .3-.13.4.4 0 0 0-.02-.58z"
								/>
								<path
									className="link__stroke"
									fill="var(--body-background, #ffffff)"
									d="M23.87 10.83L12 0 .13 10.83a.41.41 0 0 0 0 .58.43.43 0 0 0 .3.13.46.46 0 0 0 .29-.11L2.48 9.8V24H9.1v-7.58a2.9 2.9 0 0 1 5.8 0V24h6.62V9.8l1.78 1.63a.46.46 0 0 0 .29.11.43.43 0 0 0 .3-.13.4.4 0 0 0-.02-.58zm-3.35-1V23H15.9v-6.58a3.9 3.9 0 0 0-7.8 0V23H3.48V9.13L12 1.35l8.52 7.78z"
								/>
							</svg>
						</figure>

						<span className="link__label" tabIndex={-1}>
							Home
						</span>
					</TabLink>
				</Item>

				<Item title="Go to my About page">
					<TabLink
						to="/about"
						data-testid="tab-link"
						activeClassName="is-active"
						aria-label="Click to go to the About page"
						tabIndex={0}
					>
						<figure className="link__icon" tabIndex={-1}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<title>About Icon</title>
								<g id="about--filled">
									<path
										className="link__filled"
										fill="var(--body-background, #ffffff)"
										d="M10.1 3.64a2.66 2.66 0 0 0 1 .22 2.57 2.57 0 0 0 2.39-1.62l.14-.35L14 2a8.27 8.27 0 0 1 3.21 1.73A5.56 5.56 0 0 0 12.64 0 4 4 0 0 0 12 0a5.57 5.57 0 0 0-4 1.63A5.49 5.49 0 0 0 6.67 4a3.43 3.43 0 0 1 3.43-.36z"
									/>
									<path
										className="link__filled"
										fill="var(--body-background, #ffffff)"
										d="M8 5.62h1.68a1.4 1.4 0 0 1 1.06.5h2.52a1.4 1.4 0 0 1 1.06-.5H16A1.38 1.38 0 0 1 17.38 7v.27a8.14 8.14 0 0 0 .18-2 7.12 7.12 0 0 0-3.41-2.36 3.39 3.39 0 0 1-3 1.79 3.26 3.26 0 0 1-1.38-.29 2.55 2.55 0 0 0-3 .6l-.31.39a.86.86 0 0 0 0 .16 8.12 8.12 0 0 0 .19 1.65V7A1.38 1.38 0 0 1 8 5.62z"
									/>
									<rect
										className="link__filled"
										width="2.93"
										height="2.93"
										x="13.69"
										y="6.38"
										fill="var(--body-background, #ffffff)"
										rx=".63"
										ry=".63"
									/>
									<rect
										className="link__filled"
										width="2.93"
										height="2.93"
										x="7.38"
										y="6.38"
										fill="var(--body-background, #ffffff)"
										rx=".63"
										ry=".63"
									/>
									<path
										className="link__filled"
										fill="var(--body-background, #ffffff)"
										d="M14 12.33A5.06 5.06 0 0 0 16.34 10a1.27 1.27 0 0 1-.34.05h-1.68a1.38 1.38 0 0 1-1.38-1.38V7v-.12h-1.9V8.68a1.38 1.38 0 0 1-1.38 1.38H8a1.36 1.36 0 0 1-.29 0 5.08 5.08 0 0 0 2.36 2.31 1 1 0 0 1 .64.95v.27a1 1 0 0 1-1 1h-.1L12 17l2.39-2.4h-.09a1 1 0 0 1-1-1v-.28a1 1 0 0 1 .7-.99z"
									/>
									<path
										className="link__filled"
										fill="var(--body-background, #ffffff)"
										d="M16.85 14.57h-1.24L12 18.18l-3.61-3.61H7.15a5 5 0 0 0-5 4.33l.15.21.11.14.29.37a11.24 11.24 0 0 0 1.12 1.17.46.46 0 0 0 .18.11l.36.31.12.1.36.29.13.09.21.15v-2.13H6v2.68l.33.18.23.12.39.19.19.08.5.21h.11c.43.16.86.29 1.31.41h.1l.56.12h.16l.5.07H11.27L12 24h1.57l.5-.07h.17l.55-.12h.1c.45-.12.88-.25 1.31-.41h.11l.5-.21.19-.29.39-.18.23-.12.33-.19H18v-2.7h.86v2.13l.21-.15.13-.09.36-.29.12-.1.32-.31a.46.46 0 0 0 .07-.07 12.38 12.38 0 0 0 1.12-1.17l.29-.37.11-.14.15-.21a5 5 0 0 0-4.89-4.37z"
									/>
								</g>
								<g id="about--stroke">
									<path
										className="link__stroke"
										fill="var(--body-background, #ffffff)"
										d="M24 12a12 12 0 0 0-24 0 11.89 11.89 0 0 0 2 6.65l.09.12.22.3.09.13.3.37.08.11a12 12 0 0 0 1.53 1.52l.1.09.36.28.15.11.36.25.19.13.51.31.36.21.22.11.39.19.2.09.47.2.14.06a11.41 11.41 0 0 0 1.33.41h.05c.2.05.4.1.6.13h.17l.51.08H11.31L12 24H13.58l.51-.08h.17c.2 0 .4-.08.6-.13h.05a11.41 11.41 0 0 0 1.33-.41l.14-.06.47-.2.2-.09.39-.19.22-.11.36-.21.51-.31.19-.13.36-.25.15-.11.36-.28.1-.09a12 12 0 0 0 1.52-1.51.76.76 0 0 0 .08-.11l.3-.37.09-.13.22-.3.09-.12A11.89 11.89 0 0 0 24 12zM9.9 4.93a3.22 3.22 0 0 0 1.3.27A3.18 3.18 0 0 0 14 3.53a6.62 6.62 0 0 1 3.18 2.2c.12 2.44-1.32 5.81-3.36 6.58a1 1 0 0 0-.63.89v.25a.94.94 0 0 0 1 1h.08L12 16.63 9.77 14.4h.08a.94.94 0 0 0 1-1v-.2a.94.94 0 0 0-.6-.88c-1.92-.71-3.4-4-3.4-6.32v-.15l.29-.36a2.36 2.36 0 0 1 2.76-.56zM2.24 17.48A11.06 11.06 0 0 1 .8 12 11.23 11.23 0 0 1 8 1.54l-.23.21A6 6 0 0 0 6 6c0 2.65 1.68 6.24 3.92 7.07a.13.13 0 0 1 .08.13v.25a.15.15 0 0 1-.15.15H7.48a5.45 5.45 0 0 0-5.24 3.88zM21 18.64a.64.64 0 0 0-.1.13c-.09.11-.18.23-.28.34a12 12 0 0 1-1.05 1.09.23.23 0 0 1-.07.07l-.33.29-.11.09-.34.27-.12.08-.2.14v-2h-.8v2.49h-.05l-.3.17-.25.2-.36.18-.18.08-.47.19h-.1a10.74 10.74 0 0 1-1.22.38h-.09l-.52.11h-.16l-.47.07h-.18l-.47.05h-1.62l-.47-.05h-.18l-.44-.01h-.16l-.52-.11H9.3a10.74 10.74 0 0 1-1.22-.38h-.1l-.47-.19-.18-.08L7 22l-.22-.11-.3-.17V19.2H5.6v2l-.2-.2h-.12l-.34-.27-.11-.09-.33-.29-.07-.07a12 12 0 0 1-1-1.09c-.1-.11-.19-.23-.28-.34a.64.64 0 0 0-.1-.13 1.43 1.43 0 0 0-.14-.2 4.67 4.67 0 0 1 4.64-4h1.08L12 17.77l3.37-3.37h1.15a4.67 4.67 0 0 1 4.64 4 1.43 1.43 0 0 0-.16.24zm.74-1.16a5.45 5.45 0 0 0-5.24-3.88h-2.35a.15.15 0 0 1-.15-.15v-.25a.14.14 0 0 1 .11-.14c2.58-1 4.18-5 3.85-7.8a6 6 0 0 0-2-3.72A11.21 11.21 0 0 1 23.2 12a11.06 11.06 0 0 1-1.44 5.48z"
									/>
								</g>
							</svg>
						</figure>
						<span className="link__label" tabIndex={-1}>
							About
						</span>
					</TabLink>
				</Item>
				<Item title="Go to Contact page">
					<TabLink
						to="/contact"
						data-testid="tab-link"
						activeClassName="is-active"
						aria-label="Click to go to the Contacts page"
						tabIndex={0}
					>
						<figure className="link__icon" tabIndex={-1}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<title>Contact Icon</title>
								<path
									className="link__stroke"
									fill="var(--body-background, #ffffff)"
									d="M14.73 19.83l-5-7.12 12.82-8.2zM8.91 18.1l.55-4.42 1.82 2.6zM21.14 4.48l-12 7.68-7.35-2.41zm2.77-1.34a.43.43 0 0 0-.36-.14h-.09L.3 9.33a.38.38 0 0 0-.3.37.4.4 0 0 0 .28.39l8.47 2.79L8 19a.41.41 0 0 0 .2.4.46.46 0 0 0 .2 0 .41.41 0 0 0 .24-.08l3.11-2.38 2.72 3.89a.37.37 0 0 0 .32.17.39.39 0 0 0 .33-.22L24 3.58a.39.39 0 0 0-.09-.44z"
								/>
								<path
									className="link__filled"
									fill="var(--body-background, #ffffff)"
									d="M14.94 20.86l-5.75-8.22L24 3.17l-9.06 17.69zM8.21 18.86l.64-5.1 2.1 3.01-2.74 2.09zM22.33 3.14L8.48 12.01 0 9.22l22.33-6.08z"
								/>
							</svg>
						</figure>
						<span className="link__label" tabIndex={-1}>
							Contact
						</span>
					</TabLink>
				</Item>
			</List>
		</Wrapper>
	);
};

export default BottomNavigation;
