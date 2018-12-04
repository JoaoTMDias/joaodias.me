// Libraries
import React from 'react';
import styled from 'styled-components';

/**********
 ** Component: BlobFour
 ** @type: functional stateless component
 ** @description: Graphical Blob
 **********/
const BlobFour = props => {
  return (
    <Blob xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502 502" aria-labelledby="project-blob-title" tabIndex="-1">
        <title id="project-blob-title">Graphical Element for background</title>
        <path fill="var(--color-gray1, #f0ecec)" fill-rule="evenodd" d="M479.45 96.42a56 56 0 0 1-79.93 6.73 58.92 58.92 0 0 1-6.79-81.68 13.19 13.19 0 0 0-1.56-18.36 12.62 12.62 0 0 0-18 1.43C343.92 39.9 348.34 93.06 383 123a81.2 81.2 0 0 0 116-9.78 13.2 13.2 0 0 0-1.56-18.36 12.58 12.58 0 0 0-18 1.55M422.92 316.61a4.69 4.69 0 0 1-6.28 1.56A4.44 4.44 0 0 1 415 312l16-26.21a4.55 4.55 0 0 1 6.28-1.56 4.44 4.44 0 0 1 1.62 6.16l-16 26.21"/><circle cx="420.12" cy="495.46" r="6.54" fill="var(--color-gray1, #f0ecec)"/><path fill="var(--color-gray1, #f0ecec)" fill-rule="evenodd" d="M153.34 88.18a13.79 13.79 0 0 0-17.52 8.47l-30.56 86.63-86.95-29.75A13.83 13.83 0 0 0 .79 162a13.54 13.54 0 0 0 8.39 17.36l99.91 34.22a13.75 13.75 0 0 0 10.52-.65 13.6 13.6 0 0 0 7-7.82l35.13-99.59a13.53 13.53 0 0 0-8.4-17.35M285.69 47.18a6.06 6.06 0 0 1 2.85 8 5.85 5.85 0 0 1-7.82 2.93l-36.27-17.28a6.07 6.07 0 0 1-2.85-8 5.86 5.86 0 0 1 7.82-2.93l36.27 17.27"/><circle cx="127.35" cy="493.44" r="8.56" fill="var(--color-gray1, #f0ecec)"/><circle cx="136.31" cy="8.56" r="8.56" fill="var(--color-gray1, #f0ecec)"/>
    </Blob>
  );
};

const Blob = styled.svg`
    position: absolute;
    width: 100%;
    height: auto;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    opacity: 0.4;
    overflow: hidden;
`;

export default BlobFour;
