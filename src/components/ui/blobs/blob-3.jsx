// Libraries
import React from 'react';
import styled from 'styled-components';

/**********
 ** Component: BlobThree
 ** @type: functional stateless component
 ** @description: Graphical Blob
 **********/
const BlobThree = () => {
  return (
    <Blob
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 502 502"
      aria-labelledby="homepage-blob-title"
      tabIndex="-1"
    >
      <title id="homepage-blob-title">Graphical Element for background</title>
      <path
        fill="var(--color-gray0, #faf9f9)"
        d="M210 447.88c70.14 70.15 220.75 72.61 292 4.4V90.12C376-61.19 419.64 233 278.43 249.19 120.8 299.36 139.1 377 210 447.88zM41.8 230.77c15.85-8.52 25.63-39.85 19.92-50.49s-23.23-12.36-39-3.85-24.12 24.09-18.37 34.68S26 239.28 41.8 230.77zm172.25-90.93c11.07-5.94 17.2-16.12 13.62-22.72s-13.76-17.3-24.87-11.36S184 132 187.58 138.64s15.41 7.18 26.47 1.2z"
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
  bottom: 0;
  overflow: hidden;
`;

export default BlobThree;
