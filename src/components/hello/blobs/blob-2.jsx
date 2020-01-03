// Libraries
import React from "react";
import styled from "styled-components";

/**********
 ** Component: BlobTwo
 ** @type: functional stateless component
 ** @description: Graphical Blob
 **********/
export const BlobTwo = () => {
	return (
		<Blob
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 502 502"
			aria-labelledby="contact-blob-title"
			tabIndex="-1"
		>
			<title id="contact-blob-title">Graphical Element for background</title>
			<path
				fill="var(--color-gray1, #ecedf0)"
				d="M502 502c-30.22-26.12-79.44-56.41-138-154.94C301.51 242 58.87 333.79 38.4 212.63S85.89-28.81 502 6.14z"
			/>
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
	opacity: 0.3;
	overflow: hidden;
`;

export default BlobTwo;
