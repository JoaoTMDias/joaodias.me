/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import styles from "./index.module.scss";

interface Props {
	title: string;
	date: string;
	intro: string;
}

function DialogHeader({ title, date, intro }: Props): JSX.Element {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<h2 id="modal-title" className={styles.title}>
					{title}
				</h2>
				<p className={styles.date}>{date}</p>
			</div>
			<p className={styles.intro}>{intro}</p>
		</div>
	);
}

export default DialogHeader;
