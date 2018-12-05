import { rem } from "polished";
import React from "react";
import styled, { keyframes } from "styled-components";

// Components
import { HelloAnimationBlob } from "../index";

const HelloAnimation = () => (
  <Container id="hello" aria-label="Page welcome title: Hey What's up?" tabIndex={0}>
    <Mask id="art-mask">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 178" role="img">
        <path
          d="M274.05,122.35a7.78,7.78,0,0,0-5.33,2.13,12.3,12.3,0,0,0-3.41,6.15v19.72a7.44,7.44,0,0,0,2.69,3.06,7.74,7.74,0,0,0,4.27,1.15q9.41,0,9.4-17Q281.67,122.35,274.05,122.35Z"
          fill="#fff"
        />
        <path
          d="M117.13,136.61c-.7.4-1.77.92-3.22,1.58a31,31,0,0,0-4,2,8.89,8.89,0,0,0-2.66,2.6,7.31,7.31,0,0,0-1.12,4.21,6.21,6.21,0,0,0,1.45,4.47,5,5,0,0,0,3.81,1.51q4.34,0,7.43-5V135.1A4.64,4.64,0,0,1,117.13,136.61Z"
          fill="#fff"
        />
        <path
          d="M0,0V108.63c1.74.11,3.94.17,6.63.17q4.73,0,7.1-.19v1.31a5.07,5.07,0,0,0-2.5.66,1.9,1.9,0,0,0-.72,1.64,11.47,11.47,0,0,0,.72,3.22l9.6,29.32,8-25.44-1.78-5.19q-1.32-4.08-3.88-4.21v-1.31q2.37.19,6.38.19,5.66,0,8.41-.19v1.31a11.53,11.53,0,0,0-3.48.56,1.77,1.77,0,0,0-1,1.81,10.51,10.51,0,0,0,.66,3.15l9.47,29.26,8.08-25.44a18,18,0,0,0,1.05-5.33,3.41,3.41,0,0,0-1.31-3.06,8.18,8.18,0,0,0-4.27-1v-1.31q3.75.19,7.56.19c2,0,3.61-.06,4.93-.19v1.31q-3.69.85-5.2,5.72L42.06,155.48H41L29.57,121.62,19.12,155.48H18.06L4.13,114.13C3.27,111.59,1.89,110.22,0,110v68H320V0ZM47.06,17.92a13,13,0,0,0-3.46.53A2.33,2.33,0,0,0,42.13,20a11.57,11.57,0,0,0-.4,3.61V56.18a11.65,11.65,0,0,0,.4,3.62,2.35,2.35,0,0,0,1.47,1.51,13.06,13.06,0,0,0,3.46.52v1.32Q44.3,63,38.64,63q-5.32,0-8.35.2V61.83a12.9,12.9,0,0,0,3.45-.52,2.34,2.34,0,0,0,1.48-1.51,11.65,11.65,0,0,0,.4-3.62V40.4H14.25V56.18a11.65,11.65,0,0,0,.4,3.62,2.34,2.34,0,0,0,1.48,1.51,12.9,12.9,0,0,0,3.45.52v1.32q-3-.19-8.35-.2-5.66,0-8.42.2V61.83a13.06,13.06,0,0,0,3.46-.52A2.35,2.35,0,0,0,7.74,59.8a11.65,11.65,0,0,0,.4-3.62V23.57A11.57,11.57,0,0,0,7.74,20a2.33,2.33,0,0,0-1.47-1.51,13,13,0,0,0-3.46-.53V16.61q2.76.2,8.42.19c3.5,0,6.29-.06,8.35-.19v1.31a12.81,12.81,0,0,0-3.45.53A2.32,2.32,0,0,0,14.65,20a11.57,11.57,0,0,0-.4,3.61V39.09H35.62V23.57a11.57,11.57,0,0,0-.4-3.61,2.32,2.32,0,0,0-1.48-1.51,12.81,12.81,0,0,0-3.45-.53V16.61q3,.2,8.35.19,5.65,0,8.42-.19Zm73.72-5.29a3.09,3.09,0,0,1,4.37,0,4,4,0,0,1,.86,2.76q0,3.42-.92,11.7-.8,8-1.15,12.92c-.24,3.27-.36,6.67-.36,10.22h-1.19c0-3.55-.12-6.95-.36-10.22s-.62-7.57-1.15-12.92q-.91-8.28-.92-11.7A4,4,0,0,1,120.78,12.63ZM120,56.9a4.13,4.13,0,1,1-1.25,3A4,4,0,0,1,120,56.9Zm-61.34,5a13.81,13.81,0,0,1-5.23-6A20.78,20.78,0,0,1,51.66,47a24.53,24.53,0,0,1,1.84-9.92,14.63,14.63,0,0,1,5.19-6.48,13.64,13.64,0,0,1,7.82-2.27q5.92,0,9.11,3.59t3.19,10.88H58.23A40.1,40.1,0,0,0,58,47a18.51,18.51,0,0,0,1.42,7.56,12.08,12.08,0,0,0,3.74,5,8.09,8.09,0,0,0,4.9,1.74,10.33,10.33,0,0,0,5.59-1.51,11.38,11.38,0,0,0,4.08-5.07l1.31.53a13.07,13.07,0,0,1-4.44,6.21,12.21,12.21,0,0,1-7.85,2.6A14.92,14.92,0,0,1,58.69,61.93Zm38.06,93.22c-4-.18-6.66-.26-7.88-.26s-3.69.08-7.37.26v-1.38a4.55,4.55,0,0,0,3.39-1c.63-.68,1-1.92,1-3.71V130a12,12,0,0,0-1-5.62c-.7-1.3-2.13-1.94-4.27-1.94A7.86,7.86,0,0,0,75.75,124a10.06,10.06,0,0,0-3.25,4.24,15.3,15.3,0,0,0-1.19,6.15V149c0,1.79.32,3,1,3.71a4.51,4.51,0,0,0,3.38,1v1.38c-3.68-.18-6.13-.26-7.36-.26s-3.86.08-7.89.26v-1.38a5.77,5.77,0,0,0,3.88-1c.74-.68,1.12-1.92,1.12-3.71V111.56a7,7,0,0,0-1.12-4.4c-.75-.92-2-1.38-3.88-1.38V104.4c1.4.13,2.76.2,4.08.2a21.51,21.51,0,0,0,6.83-.92v24.58a12.19,12.19,0,0,1,4.57-6,12,12,0,0,1,6.61-1.88c3.07,0,5.39.84,7,2.5a7.48,7.48,0,0,1,1.77,3.29,21.43,21.43,0,0,1,.53,5.32V149c0,1.79.37,3,1.12,3.71a5.72,5.72,0,0,0,3.87,1ZM96.43,69.2a11.85,11.85,0,0,1-2.83,4.6,5.74,5.74,0,0,1-2.37,1.31,9.75,9.75,0,0,1-2.76.4,4.84,4.84,0,0,1-3.22-1.05A3.61,3.61,0,0,1,84,71.56,3.51,3.51,0,0,1,84.92,69a3.41,3.41,0,0,1,2.56-1,3.51,3.51,0,0,1,2.4.82,2.83,2.83,0,0,1,1,2.27,3.19,3.19,0,0,1-1.78,3,1,1,0,0,0,.4.06q3.62,0,5.58-5.12l2.31-6L85.45,34.36a7.46,7.46,0,0,0-2.24-3A4.1,4.1,0,0,0,81,30.67V29.29a45.8,45.8,0,0,0,6.44.4q3.28,0,8.55-.4v1.38a11.08,11.08,0,0,0-3.46.4A1.78,1.78,0,0,0,91.43,33a8.32,8.32,0,0,0,.79,3.22l7.89,19.59,7.29-19a9.49,9.49,0,0,0,.73-3,2.44,2.44,0,0,0-1.19-2.23,8.73,8.73,0,0,0-3.74-.92V29.29c2.32.14,4.16.2,5.52.2,1.93,0,3.59-.06,5-.2v1.32a3.72,3.72,0,0,0-2.33,1.18,10.3,10.3,0,0,0-1.94,3.42L98.66,63.48Zm31.06,85.85a7.37,7.37,0,0,1-3.06.56c-2.1,0-3.57-.53-4.4-1.58a6.64,6.64,0,0,1-1.25-4.27,11.55,11.55,0,0,1-4.54,4.57,12.82,12.82,0,0,1-5.78,1.28q-4.14,0-6.15-2.07a7.91,7.91,0,0,1-2-5.75,7.25,7.25,0,0,1,1.62-4.87,12,12,0,0,1,3.81-3,46.45,46.45,0,0,1,5.82-2.37,30.51,30.51,0,0,0,5.45-2.3,3.17,3.17,0,0,0,1.78-2.83v-4.07c0-2.54-.54-4.29-1.61-5.23a6.64,6.64,0,0,0-4.51-1.41q-4.59,0-6.5,2.36a4.11,4.11,0,0,1,2.2,1.39,3.92,3.92,0,0,1,.89,2.62,3.33,3.33,0,0,1-1.06,2.6,3.84,3.84,0,0,1-2.69,1,3.31,3.31,0,0,1-2.76-1.16,4.26,4.26,0,0,1-.92-2.79,4.42,4.42,0,0,1,.75-2.63,9.38,9.38,0,0,1,2.27-2.1,13.46,13.46,0,0,1,4-1.84,18.71,18.71,0,0,1,5.33-.73c3.41,0,6,.82,7.75,2.43a7.39,7.39,0,0,1,2.2,3.65,22.6,22.6,0,0,1,.56,5.62v18.28a4.68,4.68,0,0,0,.46,2.37,1.74,1.74,0,0,0,1.58.72,3.14,3.14,0,0,0,1.48-.36,8.6,8.6,0,0,0,1.48-1l.72,1.12A16.3,16.3,0,0,1,127.49,155.05Zm18.37,1a10.9,10.9,0,0,1-3.68-.53,6.77,6.77,0,0,1-2.56-1.64,7.64,7.64,0,0,1-2-3.55,23,23,0,0,1-.56-5.65v-22h-6.31v-1.31h6.31V111.3a20.35,20.35,0,0,0,5.92-.92v11h9.73v1.31H143v25.45a6.74,6.74,0,0,0,1.08,4.27,3.83,3.83,0,0,0,3.13,1.31,4.51,4.51,0,0,0,3.48-1.64,13.6,13.6,0,0,0,2.43-5.39l1.32.33Q152.76,156.06,145.86,156.07Zm19-36a11.55,11.55,0,0,1-5.1,4.21l-.59-1.18a8.9,8.9,0,0,0,3.52-2.7,5.94,5.94,0,0,0,1.47-3.74,4.38,4.38,0,0,0-.19-1.38,3.73,3.73,0,0,1-2.43.85,4.18,4.18,0,0,1-3-1.15,4,4,0,0,1-1.21-3.06,4.13,4.13,0,0,1,4.21-4.2,4.28,4.28,0,0,1,3.87,2.1,7.94,7.94,0,0,1,1.12,4.34A10.8,10.8,0,0,1,164.83,120ZM192,153.64a13,13,0,0,1-8,2.43,13.62,13.62,0,0,1-5.19-.92,13.21,13.21,0,0,1-2.69-1.78.86.86,0,0,0-.6-.26c-.3,0-.58.22-.82.66a6.19,6.19,0,0,0-.56,1.84h-1.51q.27-3.75.26-13.15h1.52c.48,4.12,1.35,7.2,2.63,9.24s3.44,3.05,6.5,3.05a6.09,6.09,0,0,0,4.08-1.51,5.88,5.88,0,0,0,1.77-4.73,6,6,0,0,0-1.74-4.34A33,33,0,0,0,182,139.9q-3.22-2-5-3.36a11.56,11.56,0,0,1-2.92-3.22,8.29,8.29,0,0,1-1.19-4.47,7.53,7.53,0,0,1,2.77-6.31,11,11,0,0,1,7-2.17,11.5,11.5,0,0,1,4.21.73,10.07,10.07,0,0,1,3,1.7,2.14,2.14,0,0,0,1.18.53c.79,0,1.27-1,1.45-2.89H194c-.18,2.15-.26,5.87-.26,11.18h-1.51a16.62,16.62,0,0,0-2.8-7.17,7.12,7.12,0,0,0-6.14-2.83,5.59,5.59,0,0,0-3.88,1.35,4.72,4.72,0,0,0-1.51,3.71,5.16,5.16,0,0,0,1.57,3.85,30.59,30.59,0,0,0,5.06,3.71c.4.22,1,.6,1.78,1.12a56.53,56.53,0,0,1,4.86,3.49,12.67,12.67,0,0,1,3,3.48,8.81,8.81,0,0,1,1.16,4.54A8,8,0,0,1,192,153.64Zm59.46,1.57c-1.36-.13-2.72-.19-4.08-.19a21.23,21.23,0,0,0-6.83.92v-7.76a12.06,12.06,0,0,1-4.47,6,11.27,11.27,0,0,1-6.31,1.91q-4.47,0-6.84-2.5a7.52,7.52,0,0,1-1.68-3.35,23,23,0,0,1-.49-5.26v-16.5a7,7,0,0,0-1.12-4.41c-.74-.92-2-1.38-3.88-1.38v-1.38a39.8,39.8,0,0,0,4.08.2,21.34,21.34,0,0,0,6.84-.92v25.84a23.05,23.05,0,0,0,.29,4,4.49,4.49,0,0,0,1.38,2.53,4.81,4.81,0,0,0,3.32,1,7.24,7.24,0,0,0,4.54-1.57,10.44,10.44,0,0,0,3.19-4.31,15.44,15.44,0,0,0,1.15-6V128.46a7,7,0,0,0-1.12-4.41c-.75-.92-2-1.38-3.88-1.38v-1.38a39.8,39.8,0,0,0,4.08.2,21.23,21.23,0,0,0,6.83-.92v27.48a7,7,0,0,0,1.12,4.4c.75.92,2,1.38,3.88,1.38Zm34.94-9.07a16.22,16.22,0,0,1-5,7.17,13,13,0,0,1-8.45,2.76,10.25,10.25,0,0,1-4.54-1,8,8,0,0,1-3.15-2.56v8.41c0,1.8.52,3,1.57,3.72a8.85,8.85,0,0,0,4.74,1v1.38l-1.51-.07q-6.12-.19-8-.19c-1,0-3.42.08-7.1.26v-1.38a5,5,0,0,0,3.39-.89,4.29,4.29,0,0,0,.95-3.19V128.46a7,7,0,0,0-1.12-4.41c-.74-.92-2-1.38-3.88-1.38v-1.38a39.8,39.8,0,0,0,4.08.2,21.34,21.34,0,0,0,6.84-.92v7a11.68,11.68,0,0,1,4.2-5.29,11.4,11.4,0,0,1,12.59,0,12.47,12.47,0,0,1,4.37,5.59,22.12,22.12,0,0,1,1.58,8.81A27.4,27.4,0,0,1,286.44,146.14Zm18.9,8.68a4.13,4.13,0,1,1,1.25-3A4.05,4.05,0,0,1,305.34,154.82Zm8.45-30.11A23.88,23.88,0,0,1,303,130.17v9.6h-1.31V129.58q6-2.24,8.15-5.29a12.88,12.88,0,0,0,2.1-7.47q0-6-2.46-8.87a8.38,8.38,0,0,0-6.74-2.89,12.58,12.58,0,0,0-3.65.52,5.54,5.54,0,0,0-2.79,1.84,3.58,3.58,0,0,1,2,1.12,3.24,3.24,0,0,1,.76,2.24,3.32,3.32,0,0,1-1,2.59,3.68,3.68,0,0,1-2.57,1,3.39,3.39,0,0,1-3.48-3.49q0-2.62,3.09-4.73a15.56,15.56,0,0,1,8.94-2.37q6.24,0,10,3.19a10.75,10.75,0,0,1,3.77,8.64A12.08,12.08,0,0,1,313.79,124.71Z"
          fill="#fff"
        />
        <path
          d="M71,33.1q-1.66-3.53-4.86-3.49a6.55,6.55,0,0,0-5.35,3.19Q58.54,36,58.07,42.08l14.49-.16A19.92,19.92,0,0,0,71,33.1Z"
          fill="#fff"
        />
      </svg>
    </Mask>
    <ArtInner id="art-inner">
      <HelloAnimationBlob />
    </ArtInner>
  </Container>
);

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  max-width: ${rem("382px")};
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0 0 auto;
  line-height: 0;
  transition: all 750ms var(--default-timing-function);
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 750ms;
  animation-timing-function: var(--default-timing-function);
  animation-fill-mode: forwards;

  @media ${props => props.theme.breakpointMedium} {
    width: 100%;
    max-width: ${rem("448px")};
  }

  @media ${props => props.theme.breakpointLarge} {
    width: 100%;
    max-width: ${rem("384px")};
  }

  &:focus {
    outline-color: var(--color-gray6);
    outline-width: 1px;
    outline-style: dashed;
    outline-offset: -1px;
  }
`;

const Mask = styled.figure`
  position: relative;
  z-index: 10;
  display: block;
  line-height: 0;

  @media ${props => props.theme.breakpointLarge} {
    transform: scaleX(1) scaleY(1) scaleZ(1);
    transform-style: preserve-3d;
    transition: transform 750ms var(--default-timing-function);
  }
`;

const ArtInner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  overflow: hidden;
  width: 99%;
  height: 99%;
  margin: auto;
  line-height: 0;
`;

export default HelloAnimation;
