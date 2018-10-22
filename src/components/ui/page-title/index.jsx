/**
 * Import Libraries
 */
import React, { PureComponent } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { rem } from 'polished';
import ScrollDownArrow from '../full-page-hero/scroll-down-arrow';

/**
 * Styling
 */
import styles from './styles.module.scss';

class PageTitle extends PureComponent {
  componentDidMount() {
    const parallax = document.querySelector('.parallax');
    const speed = -0.5;
    parallax.style.transform = 'translateY( calc( var(--scrollparallax) * 1px ) )';

    function setScrollParallax() {
      parallax.style.setProperty(
        '--scrollparallax',
        (document.body.scrollTop || document.documentElement.scrollTop) * speed
      );
      window.requestAnimationFrame(setScrollParallax);
    }

    window.requestAnimationFrame(setScrollParallax);
  }

  render() {
    const { title, subtitle, children, transparent, center, isProject } = this.props;

    return (
      <Container className="l__container l__container l__section utilities--above-the-fold" transparent={transparent}>
        <Row className="l__row parallax" center={center} isProject={isProject}>
          <Title className={`${styles.title}`} center={center} isProject={isProject}>
            {title}
          </Title>
          <Subtitle className={styles.subtitle} center={center}>
            {subtitle}
          </Subtitle>
          <Link />
        </Row>
        {children}
      </Container>
    );
  }
}

const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  align-items: center;
  height: 64vh;
  min-height: 280px;
  max-height: 760px;
  text-align: center;
  background-color: transparent;
  background-color: ${props => (props.transparent ? 'transparent' : `${props.theme.white}`)};
  background-position: center bottom;
  overflow: hidden;
  text-align: center;
  @media ${props => props.theme.breakpointLarge} {
    height: 65vh;
    min-height: ${rem('384px')};
  }
  @media ${props => props.theme.breakpointXlarge} {
    height: 70vh;
    min-height: ${rem('448px')};
  }
`;

const Row = styled.div`
  width: 100%;
  will-change: transform;
  padding: ${rem('16px')} !important;
  background-color: ${props => props.theme.white};

  @media ${props => props.theme.breakpointLarge} {
    padding: ${props => (props.isProject ? `${rem('48px')}` : `${rem('48px')} ${rem('16px')}`)} !important;
  }

  ${props =>
    props.isProject &&
    css`
      width: auto !important;
      box-shadow: 0 16px 48px 0 rgba(108, 158, 195, 0.22);
      border-radius: ${rem('12px')};
    `};

  ${props =>
    props.center &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `};
`;

const Subtitle = styled.h2`
  font-family: ${props => props.theme.bodyFontFamily};
  color: ${props => props.theme.gray9} !important;
  text-align: ${props => (props.center ? 'center' : 'left')};
  font-weight: 300;
`;

const Title = styled.h1`
  width: auto;
  text-align: ${props => (props.center ? 'center' : 'left')};
  font-family: ${props => props.theme.headerFontFamily};
  font-weight: 300;
  color: ${props => props.theme.primaryColor};
  letter-spacing: 0.7px;
  @media ${props => props.theme.breakpointMedium} {
    letter-spacing: 0.85px;
    line-height: 1.2;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(${rem('-24px')});
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Link = styled(ScrollDownArrow)`
  animation-name: ${fadeInDown};
  animation-duration: 1000ms;
  animation-delay: 1000ms;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.easeOutBack};
`;

export default PageTitle;
