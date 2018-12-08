// Libraries
import { rem } from "polished";
import * as React from "react";
import styled from "styled-components";

// Component Props
interface ISkipLinkProps {
  theme?: any;
}

/**
 * @description Skip Link to Main Content
 * @author  João Dias
 * @date  07/December/2018 at 23:19
 * @extends {React.SFC}
 */
const SkipLink: React.FunctionComponent<ISkipLinkProps> = () => {
  return (
    <Link href="#main-content" aria-label="Press Enter to skip and go to Main Content">
      Skip to Main Content
    </Link>
  );
};

// Styling
const Link = styled.a`
  &:not(:focus) {
    left: ${rem("-9999px")};
    bottom: 0;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    margin: -1px;
    opacity: 0;
  }

  display: flex;
  justify-content: center;
  outline-color: var(--color-gray1);
  opacity: 1;

  position: fixed;
  bottom: ${rem("64px")};
  left: 0;
  right: 0;

  width: calc(100% - 11.25rem);
  height: ${rem("36px")};
  text-align: center;
  font-size: ${rem("12px")};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: ${rem("36px")};

  padding: 0 ${rem("8px")};
  margin-right: auto;
  margin-left: auto;

  background-color: var(--color-primary);
  border-radius: ${rem("36px")};
  z-index: 1;

  text-decoration: none;

  transition: all 200ms var(--default-timing-function);

  &,
  &:focus {
    color: var(--color-white);
  }

  @media ${props => props.theme.breakpointMedium} {
    width: ${rem("200px")};
  }

  @media ${props => props.theme.breakpointLarge} {
    position: absolute;
    top: ${rem("64px")};
  }
`;

export default SkipLink;
