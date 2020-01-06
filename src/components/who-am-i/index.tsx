// Libraries
import Img from "gatsby-image";
import * as React from "react";
import { Container, Shape, Content } from "../../pages/about/styles";
import { ContentSpinner } from "../content-spinner";

// Interface
export interface IWhoAmIData {
	id: string;
	title: string;
	description: string;
	fluid: any;
	alt?: string;
}
export interface IWhoAmIProps {
	data?: IWhoAmIData;
}

/**
 *
 *
 * @returns {JSX.Element[]}
 */
export const WhoAmI: React.FunctionComponent<IWhoAmIProps> = ({ data }) => {
	/**
	 * Renders the image
	 *
	 * @returns {JSX.Element|null}
	 */
	function renderImage(): JSX.Element {
		if (data) {
			return (
				<Container>
					<Shape>
						<Img fluid={data.fluid} title={data.title} alt={data.alt} fadeIn />
					</Shape>
				</Container>
			);
		}

		return <ContentSpinner />;
	}

	return (
		<section id="who-am-i" className="layout__container layout__section">
			<Content className="layout__row">
				<div id="who-am-i-image" className="image">
					{renderImage()}
				</div>
				<div id="who-am-i-text" className="text">
					<h3 className="title" aria-label="Section Title: About Me. Description: I make stuff for the web.">
						I make stuff for the web.
					</h3>
					<h4 className="lead">I’m João — an interface designer and frontend developer based in Coimbra, Portugal.</h4>
					<p>
						I’ve been working in this industry for over 9 years and now mostly specialized in UX Design and Web
						Development for all kinds of screen sizes and users.
					</p>
					<p>
						Feedzai is where I work since September 2019, and it is one of the most proeminent software companies in
						Portugal.
					</p>
				</div>
			</Content>
		</section>
	);
};

export default WhoAmI;
