// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import SplitText from 'react-pose-text';

/** ********
 ** Component: ProjectIntroduction
 ** @type: functional stateless component
 ** @description: Project Intro section
 ********* */
const titlePose = {
  exit: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 16,
  },
};

const descriptionPose = {
  exit: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 24,
  },
};

const ProjectIntroduction = ({ title, description, text }) => {
  if (typeof document !== 'undefined') {
    let pageTitle = document.querySelector('.title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }

  return (
    <Wrapper className="l__row utilities--above-the-fold">
      <div className="l__project l__hero">
        <h1 className="title" tabIndex="0">
          <SplitText initialPose="exit" pose="enter" charPoses={titlePose}>
            {title}
          </SplitText>
        </h1>
        <h2 className="description" tabIndex="0">
          <SplitText initialPose="exit" pose="enter" charPoses={descriptionPose}>
            {description}
          </SplitText>
        </h2>
        <p className="lead" tabIndex="0">
          {text}
        </p>
      </div>
    </Wrapper>
  );
};

const LeadAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  height: auto;

  .title {
    width: auto;
    text-align: left;
    font-family: var(--heading-font-family);
    font-weight: 300;
    color: var(--color-primary);
    letter-spacing: 0.7px;

    font-size: ${rem('32px')};

    @media ${props => props.theme.breakpointMedium} {
      font-size: ${rem('48px')};
      line-height: 1.2;
      letter-spacing: 0.85px;
    }

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('56px')};
    }
  }

  .description {
    font-family: var(--body-font-family);
    color: var(--color-gray9);
    text-align: left;
    margin-bottom: ${rem('16px')};
    font-size: ${rem('20px')};
    @media ${props => props.theme.breakpointMedium} {
      margin-bottom: ${rem('48px')};
    }
  }

  .lead {
    font-weight: 300;
    line-height: 1.888;
    animation-name: ${LeadAnimation};
    animation-duration: 1000ms;
    animation-delay: 200ms;
    animation-timing-function: var(--default-timing-function);
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .lead,
  .description {
    font-size: ${rem('18px')};

    @media ${props => props.theme.breakpointMedium} {
      font-size: ${rem('22px')};
    }

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('24px')};
    }
  }

  .title,
  .lead,
  .description {
    &:focus {
      outline-color: $color-gray3;
      outline-width: 1px;
      outline-style: dashed;
    }
  }
`;

ProjectIntroduction.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  text: PropTypes.string,
};

export default ProjectIntroduction;
