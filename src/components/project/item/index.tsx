/**
 * Import libraries
 */
import React, { FunctionComponent } from "react";
import { Item, Inner } from "./styles";
import { IPortfolioItemProps } from "./types";
import { LazyLoadingImage } from "../../lazy-loading-images";

export const PortfolioItem: FunctionComponent<IPortfolioItemProps> = ({
	fluid,
	id,
	to,
	alt,
	theme,
	color,
	type,
	title,
	description,
}) => {
	if (fluid) {
		return (
			<Item
				id={id}
				to={`/work/${to}`}
				title={alt}
				className={`item--${theme}`}
				data-theme={theme}
				aria-label={`Open project: ${title}`}
			>
				<LazyLoadingImage
					id={id}
					fluid={fluid}
					alt={alt}
					backgroundColor={color}
					objectFit="cover"
					useNativeLazyLoading
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
						<p className="inner__seemore" title="Click to view this project">View Project</p>
					</footer>
				</Inner>
			</Item>
		);
	}
	return null;
};

export default PortfolioItem;
