/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { useState } from "react";
import Dialog from "./dialog";
import Item from "./item";
import styles from "./index.module.scss";
import PAGE_CONTENT from "../../data/index.json";
import { WorkData } from "../../data/content-types";

const TitleArrow = () => (
	<span className={styles.arrow} aria-hidden="true">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
			<path
				fill="var(--text-color)"
				d="M15.2 38.64v.48h5.76v-.48c0-4.88 1.92-9.52 5.36-13.04 3.44-3.52 8.08-5.44 12.96-5.52h.4v-1.04h-.48c-4.88-.08-9.44-2-12.88-5.52-3.44-3.44-5.36-8.08-5.36-13.04V0H15.2v.48c0 5.28 2.48 10.16 7.04 13.84 2.72 2.16 5.92 3.76 9.44 4.72H.8v1.04h30.88c-3.52.96-6.72 2.56-9.44 4.72-4.56 3.68-7.04 8.64-7.04 13.84Z"
			/>
		</svg>
	</span>
);

const { title, description, data: SelectWorkData } = PAGE_CONTENT.work;

function Work() {
	const [showDialog, setShowDialog] = useState(false);
	const [selectedProject, setSelectedProject] = useState(0);

	function handleOnClose() {
		setShowDialog(false);
	}

	function handleOnClickOnButton(index: number) {
		setSelectedProject(index);
		setShowDialog(true);
	}

	function renderDialog() {
		const data: WorkData = SelectWorkData[selectedProject];

		return <Dialog data={data} onClose={handleOnClose} />;
	}

	return (
		<>
			<div className={styles.work}>
				<h2 id="work" className={styles.title}>
					<TitleArrow />
					<span>{title}</span>
				</h2>
				<span id="work-description" className="sr-only">
					{description}
				</span>
				<ol
					className={styles.work__list}
					data-testid="work-list"
					style={
						{
							"--numcards": SelectWorkData.length,
						} as React.CSSProperties
					}
				>
					{SelectWorkData.map((work, index) => (
						<Item
							key={work.id}
							index={index}
							id={work.id}
							title={work.title}
							skills={work.skills}
							subtitle={work.shortDescription}
							thumbnail={work.thumbnail}
							theme={work.theme}
							onClick={() => handleOnClickOnButton(index)}
						/>
					))}
				</ol>
			</div>
			{showDialog && renderDialog()}
		</>
	);
}

export default Work;
