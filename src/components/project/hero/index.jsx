// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const ProjectHero = props => {
  const { id, backgroundImage } = props;
  return (
    <Masthead id={id}>
      <BackgroundImage backgroundImage={backgroundImage} />
    </Masthead>
  );
};

const MaskAnimation = keyframes`
 0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
 }

 90% {
    clip-path: polygon(0 0, 89% 0, 78% 100%, 0% 100%);
 }

 100% {
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
 }
`;
const Masthead = styled.div`
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
  max-height: 20rem;
  background-color: transparent;
  margin-top: 1rem;
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  animation-name: ${MaskAnimation};
  animation-duration: 1500ms;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  @media ${props => props.theme.breakpointMedium} {
    margin-top: 0;
  }

  @media ${props => props.theme.breakpointLarge} {
    height: 70vh;
    max-height: 40rem;
  }

  @media ${props => props.theme.breakpointXlarge} {
    height: 65vh;
  }
`;

const BackgroundImage = styled.figure`
  width: 100%;
  height: 100%;
  background-image: ${props =>
    props.backgroundImage
      ? `url(${props.backgroundImage}?h=600&fm=jpg&q=85&fl=progressive)`
      : 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;

  @media ${props => props.theme.breakpointXlarge} {
    background-attachment: fixed;
  }
`;

ProjectHero.propTypes = {
  id: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default ProjectHero;
