// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';

/** ********
 ** Component: ProjectIntroduction
 ** @type: functional stateless component
 ** @description: Project Intro section
 ********* */
const from = {
  opacity: 0,
  transform: `translate3d(0, 1.5rem, 0)`,
};

const to = {
  opacity: 1,
  transform: `translate3d(0,0,0)`,
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
        <Spring from={from} to={to} delay={125}>
          {props => {
            return (
              <h1 className="title" tabIndex="0" aria-label={`${title}`} style={props}>
                {title}
              </h1>
            );
          }}
        </Spring>
        <Spring from={from} to={to} delay={375}>
          {props => {
            return (
              <h2 className="description" tabIndex="0" aria-label={`${description}`} style={props}>
                {description}
              </h2>
            );
          }}
        </Spring>
        <Spring from={from} to={to} delay={500}>
          {props => {
            return (
              <p className="lead" tabIndex="0" aria-label={`${text}`} style={props}>
                {text}
              </p>
            );
          }}
        </Spring>
      </div>
    </Wrapper>
  );
};

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

ProjectIntroduction.defaultProps = {
  title: 'title',
  description: 'description',
  text: 'text',
};

ProjectIntroduction.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  text: PropTypes.string,
};

export default ProjectIntroduction;
