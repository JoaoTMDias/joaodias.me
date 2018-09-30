import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import styled from 'styled-components';

const Branding = () => (
  <Brand to="/" aria-label="João Dias logo">
    <Logo id="logo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <circle className="brand__circle" cx="24" cy="24" r="24" fill="#fff" />
      <path
        className="brand__hair"
        d="M26.09 23.19s1.52-.6-.56 3.06c0 0 3.79-.87 3.11-3.94.22 1 .52.4-.12 3a4.73 4.73 0 0 0 2.65-2.65c0 .32.8.81-.33 2.9.56-.2.72-.39.85-.85a8.21 8.21 0 0 1-.43 3.74 5.18 5.18 0 0 0 1.67-2.3c.13-.92.77 3.37-.57 6.18a11.49 11.49 0 0 0 1.41-1.78c.56-1.22 0 2.84-.1 4.28-.49 2 .25 2 .25 2.92a3.73 3.73 0 0 0 1.59.12 2.87 2.87 0 0 0 1.83-1.34 6.75 6.75 0 0 0 .85-1.59.93.93 0 0 1-.61-.12c-.37-.24-.37-1-.37-1 2.07 1.15 2.37-.32 2.06-1.59a2 2 0 0 1-.27-1.44c.64-16.33-6.7-16.46-6.7-16.46a9 9 0 0 1 2.92-1.12 9.81 9.81 0 0 0-3.91 1.25 3.46 3.46 0 0 0-3-3.17A2.5 2.5 0 0 1 29.88 13s-5.53-4.33-11.46-1.84a9.4 9.4 0 0 1 4.77 0c-.19-.1-10.42-.95-14.55 8.13 1.6-1.77 2.15-2.4 2.46-2.16.19 0-2.23 3.58-2 12.93.15 1.47.5 1.25.73 1.71-.12.34-.35.4-.49.85-1.59 3 2.69 3.65 2.69 3.65a1.86 1.86 0 0 1-.37-2.44H12a2.15 2.15 0 0 1 .85.61c0-.37-.6-3.7 0-4.1 12.24-3.59 13.24-7.15 13.24-7.15zm-13.23 13.5a.6.6 0 0 1 .61-.12.62.62 0 0 1 .39.49v.12a3.81 3.81 0 0 1-2 .73c-.73 0-.59-.49-1.07-1.1.02 0 1.58.56 2.07-.12z"
      />
      <path
        className="brand__glasses"
        d="M12.11 27.91a.87.87 0 0 0 .26.7l.1.12a1.12 1.12 0 0 1 .12.35c.5 3 .61 3.42 1.87 4.08a7.57 7.57 0 0 0 3.09.53 7.89 7.89 0 0 0 3.52-.69c1.69-.88 2.33-3.94 2.36-4.09s.05-.38.83-.38c.73 0 .79.36.79.4s.66 3.18 2.35 4.07a8 8 0 0 0 3.6.7 7.56 7.56 0 0 0 3.08-.53c1.26-.66 1.37-1.07 1.87-4.08a1.12 1.12 0 0 1 .12-.35l.1-.12a.87.87 0 0 0 .26-.7V27a1 1 0 0 0-.85-.9 22.37 22.37 0 0 0-6-.3h-.11a8.09 8.09 0 0 0-3 .54l-.6.29a5.77 5.77 0 0 1-1.07.41l-.3.06a1.57 1.57 0 0 1-.53 0l-.3-.06a5.77 5.77 0 0 1-1.07-.41l-.6-.29a8.09 8.09 0 0 0-3-.54 22.37 22.37 0 0 0-6 .3 1 1 0 0 0-.85.9v.88zm23.79-.75v.45l-.56-.22zm-9.72.65c.08-.21.62-.91 3.93-1.1.58 0 1.07-.05 1.51-.05 2 0 2.58.35 2.95.92a3.26 3.26 0 0 1 .37 1.5c0 1-.19 2.73-1.55 3.38a6.12 6.12 0 0 1-2.5.48c-1.81 0-3.25-.61-3.87-1.64-1.29-2.16-.85-3.45-.84-3.48zm-12.24-.24c.37-.57 1-.92 3-.92.43 0 .92 0 1.51.05 3.31.19 3.85.89 3.94 1.13 0 0 .44 1.3-.85 3.46a4.44 4.44 0 0 1-3.87 1.64 6.12 6.12 0 0 1-2.5-.48c-1.36-.66-1.56-2.4-1.55-3.38a3.39 3.39 0 0 1 .32-1.5zm-1.34-.4l.56.23-.56.22z"
      />
    </Logo>
  </Brand>
);

export default Branding;

// ////
// Logo
// ////

const Brand = styled(Link)`
  display: flex;
  align-self: flex-start;
  flex: 1;
  width: 3rem;
  text-decoration: none;
  margin: 0;
`;
const Logo = styled.svg`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  margin: 0;
  vertical-align: middle;
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

  .brand__hair {
    fill: ${props => props.theme.blendColor};
  }

  .brand__glasses {
    fill: ${props => props.theme.primaryColor};
  }

  &:hover {
    transform: scale(1.2) rotate(10deg);

    .brand__hair {
      fill: ${props => props.theme.blendColor};
    }

    .brand__glasses {
      transform: translateY(2px);
      fill: ${props => props.theme.alternateColor};
    }
  }

  &:active {
    transform: scale(1.4) rotate(-10deg);

    .brand__hair {
      fill: ${props => props.theme.primaryColor};
    }

    .brand__glasses {
      transform: translateY(2px);
      fill: ${props => props.theme.alternateColor};
    }
  }
`;