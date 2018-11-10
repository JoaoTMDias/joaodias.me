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
        <path fill="var(--color-gray1)" d="M0 0v53c41.13 46 119 86 193.84 104.46 91.29 22.49 242.68 21 308.16-68.15V0z"/>
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
