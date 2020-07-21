/**
 * Import Libraries
 */
import React from "react";
import { Item, External } from "./index.styles";

interface ICallToActionItemProps {
	id: string;
	title: string;
	subtitle: string;
	linkText: string;
	linkURL: string;
	ariaLabel: string;
	isFile?: boolean;
	as?: string;
}

export const CallToActionItem: React.FC<ICallToActionItemProps> = ({
	id,
	title,
	subtitle,
	linkText,
	linkURL,
	ariaLabel,
	isFile,
}) => {
	if (isFile) {
		return (
			<External
				id={`${id}`}
				href={linkURL}
				as="a"
				className="callToAction"
				aria-label={ariaLabel}
				download="resume-joao-dias.pdf"
				target="_blank"
			>
				<div className="item__inner">
					<header className="item__top">
						<p className="item__subtitle">{subtitle}</p>
						<h3 className="item__title">{title}</h3>
					</header>
					<footer className="item__bottom">
						<p className="fadeIn item__link">{linkText}</p>
					</footer>
				</div>
			</External>
		);
	}
	return (
		<Item id={id} to={linkURL} className="callToAction" aria-label={ariaLabel}>
			<div className="item__inner">
				<header className="item__top">
					<p className="item__subtitle">{subtitle}</p>
					<h3 className="item__title">{title}</h3>
				</header>
				<footer className="item__bottom">
					<p className="fadeIn item__link">{linkText}</p>
				</footer>
			</div>
		</Item>
	);
};

export default CallToActionItem;
