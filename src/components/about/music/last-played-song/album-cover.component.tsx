// Libraries
import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useSpring, animated } from 'react-spring';

// Interface
interface IAlbumCoverProps {
  theme?: any;
  url: string;
  name: string;
  artist: string;
  src: string;
  alt: string;
  width?: number;
}

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.1,
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

/**
 * @description Recent Song Album Cover
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IAlbumCoverProps>}
 */
const AlbumCover: React.FunctionComponent<IAlbumCoverProps> = props => {
  const { src, alt, url, name, artist, width } = props;
  const { ...rest } = props;

  const [animation, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const AnimatedCover = animated(Cover);

  return (
    <AnimatedCover
      href={url}
      title={`Click/Enter to listen to ${name} by ${artist} on Last.fm`}
      onMouseMove={
        // @ts-ignore
        ({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })
      }
      onMouseLeave={
        // @ts-ignore
        () => set({ xys: [0, 0, 1] })
      }
      style={
        // @ts-ignore
        { transform: animation.xys.interpolate(trans) }
      }
      {...rest}
    >
      <Album {...rest} src={src} width={width} height={width} alt={alt} />
    </AnimatedCover>
  );
};

AlbumCover.defaultProps = {
  width: 240,
};

// Styling
const RECORD_COVER_SIZE = 240;

const Cover = styled.a`
  width: ${(props: IAlbumCoverProps) =>
    props.width
      ? `${rem(`${props.width}px`)}`
      : `${rem(`${RECORD_COVER_SIZE}px`)}`};
  height: ${(props: IAlbumCoverProps) =>
    props.width
      ? `${rem(`${props.width}px`)}`
      : `${rem(`${RECORD_COVER_SIZE}px`)}`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--global-margin);

  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 500ms;
  will-change: transform;

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }

  img {
    position: absolute;
  }

  @media ${({ theme }) => theme.breakpointLarge} {
    justify-content: flex-start;
  }
`;

const Album = styled.img`
  width: ${(props: IAlbumCoverProps) =>
    props.width
      ? `${rem(`${props.width}px`)}`
      : `${rem(`${RECORD_COVER_SIZE}px`)}`};
  height: ${(props: IAlbumCoverProps) =>
    props.width
      ? `${rem(`${props.width}px`)}`
      : `${rem(`${RECORD_COVER_SIZE}px`)}`};
  z-index: 1;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: ${rem('8px')};
  transition: transform 250ms;
  background-color: var(--color-gray7);
  color: var(--color-white);
`;

export default React.memo(AlbumCover);
