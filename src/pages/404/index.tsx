// Libraries
import { Link } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

// Components
import { A11yPageTitle, Layout } from "../../components/index";

// Styles
const styles = require("./not-found.module.scss");

/**
 * @descriptZion Not Found Page
 * @author  João Dias
 * @date  02/December/2018 at 00:01
 * @extends {React.SFC}
 */
const NotFoundPage: React.FunctionComponent = () => {
	return (
		<Layout>
			<div className={`layout__container layout__row layout__section ${styles.container}`}>
				<A11yPageTitle title="404 Error. Page wasn't found." />

				<Helmet
					title="joaodias.me - Page not Found"
					meta={[
						{ name: "description", content: "404 - Page not found" },
						{ name: "keywords", content: "sample, something" },
					]}
				/>
				<div className={styles.row}>
					<h1 className={styles.title}>Oh, darn it!</h1>
					<h2 className={styles.subtitle}>I cannot seem to find the page you are looking for.</h2>
					<h6 className={styles.code}>Error code: 404</h6>
					<ul className={styles.list}>
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
				</div>
				<figure className={styles.image}>
					<img
						src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
						width="450"
						height="379"
						alt="A confused-looking John Travolta"
					/>
				</figure>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
