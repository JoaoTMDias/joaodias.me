// Libraries
import React from 'react';
import styled from 'styled-components';

// Components
// import Component from '../components/componentName';

/**********
 ** Component: BlobOne
 ** @type: functional stateless component
 ** @description: Graphical Blob
 **********/
const BlobOne = props => {
  return (
    <Blob xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502 502" aria-labelledby="about-blob-title" tabIndex="-1">
      <title id="about-blob-title">Graphical Element for background</title>
      <path
        fill="var(--color-gray1)"
        d="M234.75 62.91C153.21-18.64-21.87-21.5-104.74 57.8v421C41.72 654.7-9 312.68 155.16 293.89c183.24-58.32 161.97-148.61 79.59-230.98zM430.23 315.3c-18.42 9.9-29.79 46.33-23.15 58.69s27 14.37 45.38 4.48 28-28 21.31-40.32-25.13-32.74-43.54-22.85zM230 421c-12.87 6.91-20 18.74-15.84 26.42s16 20.11 28.92 13.2 21.81-30.53 17.69-38.22-17.91-8.35-30.77-1.4z"
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
  opacity: 0.32;
  overflow: hidden;
`;

export default BlobOne;
