// Libraries
import { Link } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Image } from "./styles";

/**
 * @descriptZion Not Found Page
 * @author  João Dias
 * @date  02/December/2018 at 00:01
 * @extends {React.FC}
 */
const NotFoundPage: React.FunctionComponent = () => {
	return (
		<Container className="layout__row">
			<Helmet
				title="joaodias.me - Page not Found"
				meta={[
					{ name: "description", content: "404 - Page not found" },
					{ name: "keywords", content: "sample, something" },
				]}
			/>
			<Row>
				<h1 className="title">Oh, darn it!</h1>
				<h2 className="subtitle">I cannot seem to find the page you are looking for.</h2>
				<h6 className="code">Error code: 404</h6>
				<ul className="list">
					<li>Here are some links instead:</li>
					<li>
						<Link to="/">Homepage</Link>
					</li>
					<li>
						<Link to="/about/">About</Link>
					</li>
					<li>
						<Link to="/contact/">Contact</Link>
					</li>
				</ul>
			</Row>
			<Image>
				<img
					src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
					width="450"
					height="379"
					alt="A confused-looking John Travolta"
				/>
			</Image>
		</Container>
	);
};

export default NotFoundPage;
