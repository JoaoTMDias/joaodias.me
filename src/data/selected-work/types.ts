/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

export interface SelectedProjectsProps {
	data?: Project[];
}

export interface Project {
	id?: string;
	title?: string;
	shortDescription?: string;
	thumbnail?: Thumbnail;
	skills?: string[];
	details?: Details;
}

export interface Details {
	date?: string;
	description?: string;
	cover?: Thumbnail;
	sourceCode?: string;
	problem?: string[];
	solution?: string[];
	photos?: Thumbnail[];
}

export interface Thumbnail {
	src?: string;
	width?: number;
	height?: number;
	alt?: Alt;
}

export enum Alt {
	Cenas = "cenas",
}
