/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import * as React from "react";
import styles from "./index.module.scss";

interface Props {
	index: number;
	id: string;
	title: string;
	subtitle: string;
	skills: string[];
	thumbnail: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
	theme: {
		foreground: string;
		background: string;
	};
	onClick: () => void;
}

function Item({ id, title, subtitle, skills, thumbnail, theme, index, onClick }: Props) {
	const ariaLabel = `${title}, ${subtitle}`;
	const styleProperties = {
		item: {
			"--index": index + 1,
		} as React.CSSProperties,
		button: {
			"--text-color-hover": theme.foreground,
			"--background-color-hover": theme.background,
		} as React.CSSProperties,
	};

	return (
		<li className={styles.work__list__item} style={styleProperties.item}>
			<button
				id={id}
				type="button"
				aria-label={ariaLabel}
				aria-describedby="work-description"
				className={styles.item}
				onClick={onClick}
				style={styleProperties.button}
				data-testid="work-item"
			>
				<div className={styles.figure}>
					<img {...thumbnail} loading="lazy" />
				</div>
				<div className={styles.content}>
					<h3 className={styles.content__title} data-testid="work-item-title">
						{title}
					</h3>
					<p className={styles.content__subtitle} data-testid="work-item-subtitle">
						{subtitle}
					</p>
					<ul className={styles.skills} data-testid="work-item-skills">
						{skills.map((skill) => (
							<li key={skill} data-testid="work-item-skill">
								{skill}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.content__toggle}>
					<p className={styles.content__toggle__label} data-testid="work-item-open">
						Open Project
					</p>
					<svg
						className={styles.content__toggle__vector}
						xmlns="http://www.w3.org/1999/xlink"
						fill="none"
						viewBox="0 0 48 48"
					>
						<path
							className={styles.content__toggle__path}
							fill="var(--text-color)"
							d="M18.857 12h-5.143c-.947 0-1.714.767-1.714 1.714v5.143a1.713 1.713 0 1 0 3.429 0V15.43h3.428c.948 0 1.714-.767 1.714-1.715 0-.947-.766-1.714-1.714-1.714Zm15.429 0h-5.143a1.713 1.713 0 1 0 0 3.429h3.428v3.428c0 .948.767 1.714 1.715 1.714.947 0 1.714-.766 1.714-1.714v-5.143c0-.947-.766-1.714-1.714-1.714ZM18.857 32.571H15.43v-3.428c0-.948-.767-1.714-1.715-1.714-.947 0-1.714.766-1.714 1.714v5.143c0 .947.767 1.714 1.714 1.714h5.143c.948 0 1.714-.767 1.714-1.714 0-.948-.766-1.715-1.714-1.715Zm15.429-5.142c-.948 0-1.715.766-1.715 1.714v3.428h-3.428c-.948 0-1.714.767-1.714 1.715 0 .947.766 1.714 1.714 1.714h5.143c.947 0 1.714-.767 1.714-1.714v-5.143c0-.948-.766-1.714-1.714-1.714Z"
						/>
					</svg>
				</div>
			</button>
		</li>
	);
}

export default Item;
