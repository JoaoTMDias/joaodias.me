// Libraries
import * as React from "react";
import { useSpring, animated } from "react-spring";
import { IAlbumCoverProps, Cover, Album } from "./styles";

const calc = (x: number, y: number) => [-(y - window.innerHeight / 2) / 10, (x - window.innerWidth / 2) / 10, 1.1];
const trans = (x: number, y: number, s: number) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const defaultProps = {
	width: 240,
};

/**
 * @description Recent Song Album Cover
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IAlbumCoverProps>}
 */
const AlbumCover: React.FunctionComponent<IAlbumCoverProps> = props => {
	const { src, alt, url, name, artist, width } = props;
	const { ...rest } = props;

	const [animation, setAnimation] = useSpring(() => ({
		xys: [0, 0, 1],
		config: { mass: 5, tension: 350, friction: 40 },
	}));

	const AnimatedCover = animated(Cover);

	const title = `Click/Enter to listen to ${name} by ${artist} on Last.fm`;

	return (
		<AnimatedCover
			data-testid="component-animated-cover"
			href={url}
			title={title}
			onMouseMove={
				(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
					setAnimation({ xys: calc(event.clientX, event.clientY) })
				// eslint-disable-next-line react/jsx-curly-newline
			}
			onMouseLeave={() => setAnimation({ xys: [0, 0, 1] })}
			style={{ transform: animation.xys.interpolate(trans) }}
			{...rest}
		>
			<Album {...rest} src={src} width={width} height={width} alt={alt} />
		</AnimatedCover>
	);
};

AlbumCover.defaultProps = defaultProps;

export default React.memo(AlbumCover);
