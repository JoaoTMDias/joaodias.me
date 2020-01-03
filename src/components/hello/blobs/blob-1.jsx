// Libraries
import React from "react";
import styled from "styled-components";

// Components
// import Component from '../components/componentName';

/**********
 ** Component: BlobOne
 ** @type: functional stateless component
 ** @description: Graphical Blob
 **********/
export const BlobOne = () => {
	return (
		<Blob
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 502 502"
			aria-labelledby="about-blob-title"
			tabIndex="-1"
		>
			<title id="about-blob-title">Graphical Element for background</title>
			<path
				fill="var(--color-gray1, #f0ecec)"
				fillRule="evenodd"
				d="M22.55 96.42a12.58 12.58 0 0 0-18-1.55A13.2 13.2 0 0 0 3 113.23 81.2 81.2 0 0 0 119 123c34.68-29.95 39.1-83.11 9.84-118.47a12.62 12.62 0 0 0-18-1.43 13.19 13.19 0 0 0-1.56 18.36 58.92 58.92 0 0 1-6.79 81.68 56 56 0 0 1-79.93-6.73M79.08 316.61l-16-26.21a4.44 4.44 0 0 1 1.62-6.16 4.55 4.55 0 0 1 6.3 1.56L87 312a4.44 4.44 0 0 1-1.62 6.16 4.69 4.69 0 0 1-6.28-1.56"
			/>
			<circle cx="81.88" cy="495.46" r="6.54" fill="var(--color-gray1, #f0ecec)" />
			<path
				fill="var(--color-gray1, #f0ecec)"
				fillRule="evenodd"
				d="M348.66 88.18a13.53 13.53 0 0 0-8.4 17.35l35.13 99.59a13.6 13.6 0 0 0 7 7.82 13.75 13.75 0 0 0 10.52.65l99.91-34.22a13.54 13.54 0 0 0 8.39-17.37 13.83 13.83 0 0 0-17.52-8.48l-86.95 29.75-30.56-86.62a13.79 13.79 0 0 0-17.52-8.47M216.31 47.18l36.27-17.27a5.86 5.86 0 0 1 7.82 2.93 6.07 6.07 0 0 1-2.85 8L221.28 58.1a5.85 5.85 0 0 1-7.82-2.93 6.06 6.06 0 0 1 2.85-8"
			/>
			<circle cx="374.65" cy="493.44" r="8.56" fill="var(--color-gray1, #f0ecec)" />
			<circle cx="365.69" cy="8.56" r="8.56" fill="var(--color-gray1, #f0ecec)" />
		</Blob>
	);
};

const Blob = styled.svg`
	position: absolute;
	width: 100%;
	height: auto;
	z-index: -1;
	left: 0;
	top: 0;
	opacity: 0.32;
	overflow: hidden;
`;

export default BlobOne;
