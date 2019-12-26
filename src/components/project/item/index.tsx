/**
 * Import libraries
 */
import React, { FunctionComponent } from "react";
import { Item, LazyLoadImage, Inner } from "./styles";
import { IPortfolioItemProps } from "./types";

export const PortfolioItem: FunctionComponent<IPortfolioItemProps> = ({
	cover,
	id,
	to,
	alt,
	theme,
	color,
	type,
	title,
	description,
}) => {
	if (cover) {
		return (
			<Item
				id={`${id}`}
				to={`/work/${to}`}
				title={alt}
				className={`item--${theme}`}
				data-theme={theme}
				aria-label={`Open project: ${title}`}
			>
				<LazyLoadImage
					fluid={cover}
					title={alt}
					alt={alt}
					style={{
						position: "absolute",
					}}
					backgroundColor={color}
					critical={false}
					loading="lazy"
					imgStyle={{
						position: "relative",
						objectFit: "cover",
						objectPosition: "center center",
					}}
					fadeIn
				/>
				<Inner className="inner" style={{ backgroundColor: `${color}` }}>
					<header className="inner__header">
						<h3 className="type inner__type">{type}</h3>
						<h2 className="title inner__title">{title}</h2>
					</header>

					<div className="inner__content">
						<p className="description inner__description">{description}</p>
					</div>

					<footer className="inner__footer">
						<p className="inner__seemore">View Project</p>
					</footer>
				</Inner>
			</Item>
		);
	}
	return null;
};

export default PortfolioItem;
