import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import ExternalLink from '../external-link';

import styles from './styles.module.scss';

const SocialNavigation = () => (
  <nav id="social-navigation" className={styles.navigation__container} tabIndex="-1">
    <ul className={styles.navigation__social} aria-label="Social network links" tabIndex="-1">
      <li className={styles.navigation__item}>
        <SocialLink to="https://fb.com/JoaoTMDias" aria-label="Follow me on Facebook" tabIndex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="white" d="M12.88 22v-.07a10.55 10.55 0 0 1-1.13.07z" />
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M15.12 13l1.13-2.81h-3.37V7.94A1.13 1.13 0 0 1 14 6.81h1.12V4h-2.24A3.38 3.38 0 0 0 9.5 7.38v2.81H7.25V13H9.5v8.74a10.41 10.41 0 0 0 2.25.26 10.55 10.55 0 0 0 1.13-.07V13z"
            />
          </svg>
        </SocialLink>
      </li>
      <li className={styles.navigation__item}>
        <SocialLink to="https://instagram.com/JoaoTMDias" aria-label="Follow me on Instagram" tabIndex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M15.75 2h-7.5A6.25 6.25 0 0 0 2 8.25v7.5A6.25 6.25 0 0 0 8.25 22h7.5A6.25 6.25 0 0 0 22 15.75v-7.5A6.25 6.25 0 0 0 15.75 2zm4.37 13.75a4.37 4.37 0 0 1-4.37 4.37h-7.5a4.37 4.37 0 0 1-4.37-4.37v-7.5a4.37 4.37 0 0 1 4.37-4.37h7.5a4.37 4.37 0 0 1 4.37 4.37z"
            />
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.12A3.12 3.12 0 1 1 15.12 12 3.12 3.12 0 0 1 12 15.12z"
            />
            <circle fill="#b09a9a" cx="17.38" cy="6.62" r=".67" />
          </svg>
        </SocialLink>
      </li>

      <li className={styles.navigation__item}>
        <SocialLink to="https://github.com/Joaotmdias" aria-label="Check out my repos on Github" tabIndex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M12 2.21a10 10 0 0 0-3.16 19.56c.5.1.68-.21.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34A2.64 2.64 0 0 0 5 16.77c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1 2.13 2.13 0 0 0 2.94.84 2.22 2.22 0 0 1 .63-1.35c-2.22-.25-4.55-1.11-4.55-5A3.89 3.89 0 0 1 6.65 9a3.62 3.62 0 0 1 .1-2.66s.84-.27 2.75 1a9.92 9.92 0 0 1 2.5-.28 10 10 0 0 1 2.51.34c1.9-1.3 2.74-1 2.74-1a3.56 3.56 0 0 1 .1 2.6 3.89 3.89 0 0 1 1 2.69c0 3.86-2.34 4.71-4.57 5a2.39 2.39 0 0 1 .68 1.86v2.75c0 .33.18.58.69.48A10 10 0 0 0 12 2.21z"
            />
          </svg>
        </SocialLink>
      </li>

      <li className={styles.navigation__item}>
        <SocialLink to="https://dribbble.com/Joaotmdias" aria-label="Check out some dribble shots" tabIndex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18.75A8.75 8.75 0 1 1 20.75 12 8.77 8.77 0 0 1 12 20.75z"
            />
            <path
              className="social__fill"
              fill="#b09a9a"
              d="M16.79 6.23A7.47 7.47 0 0 0 12 4.5a7 7 0 0 0-1.53.16 36 36 0 0 1 2.46 4 18 18 0 0 0 3.86-2.43zM14.39 11.88a13.87 13.87 0 0 1 5.1-.09 7.44 7.44 0 0 0-1.81-4.68 19 19 0 0 1-4.21 2.68c.33.69.64 1.38.92 2.09zM9.21 5a7.48 7.48 0 0 0-4.51 5.31 17.6 17.6 0 0 0 7.06-1.16A34.25 34.25 0 0 0 9.21 5zM12.33 10.29a18.92 18.92 0 0 1-6.83 1.3h-1v.45a7.46 7.46 0 0 0 1.77 4.83 14.05 14.05 0 0 1 6.9-4.64c-.26-.68-.54-1.32-.84-1.94zM14.85 13.06a35.73 35.73 0 0 1 1.4 5.11A7.48 7.48 0 0 0 19.42 13a12.76 12.76 0 0 0-4.57.06zM7.16 17.72A7.43 7.43 0 0 0 12 19.5a7.52 7.52 0 0 0 3.11-.68 35.06 35.06 0 0 0-1.49-5.47 12.78 12.78 0 0 0-6.46 4.37z"
            />
          </svg>
        </SocialLink>
      </li>
    </ul>
  </nav>
);

const SocialLink = styled(ExternalLink)`
  width: ${rem('32px')};
  height: ${rem('48px')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.breakpointLarge} {
    width: ${rem('48px')};
  }

  &:hover,
  &:focus {
    .social__fill {
      fill: var(--color-primary);
    }
  }

  svg {
    width: ${rem('24px')};
    height: ${rem('24px')};
    display: flex;
  }
`;

export default SocialNavigation;
