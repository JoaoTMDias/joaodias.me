import styled from "styled-components";
import { above } from "../../helpers/media-queries.helper";
import { rem } from "polished";
import { theme } from "../../helpers/theme.helper";

export const LastPlayedSongTitle = styled.h2`
	color: var(--color-gray8, #646b82);
	text-align: center;
	font-size: 1.125rem;
	font-family: var(--body-font-family);

	${theme.dark`
		color: var(--color-gray4);
	`};
`;

export const LastPlayedSong = styled.div`
	width: 100%;
	max-width: 30rem;
	min-width: 20rem;
	flex-direction: column;
	display: flex;
	margin: 0 auto;
	align-items: center;

	${above.large`
		max-width: 40rem;
		min-width: 35rem;
	`};
`;

export const InfoContainer = styled.div`
	display: flex;
	margin-left: 0;
	flex-direction: column;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;

	.track {
		font-family: var(--body-font-family);
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 0.75rem;
	}

	.track a {
		color: var(--color-gray9, #3a3e4c);
	}

	.album {
		font-size: 0.875rem;
		color: var(--color-gray8, #646b82);
	}

	.artist {
		font-size: 0.875rem;
	}

	.artist,
	.album {
		margin-bottom: 0.5rem;
	}

	.track,
	.track a,
	.url,
	.artist {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	${theme.dark`
		.track a,
		.artist {
			color: var(--color-gray3);
		}
		

		.album {
			color: var(--color-gray4);
		}
	`};
`;

export const RECORD_COVER_SIZE = 240;

export const Cover = styled.a`
	width: ${(props: IAlbumCoverProps) => {
		if (props.width) {
			return `${rem(`${props.width}px`)}`;
		}

		return `${rem(`${RECORD_COVER_SIZE}px`)}`;
	}};
	height: ${(props: IAlbumCoverProps) => {
		if (props.width) {
			return `${rem(`${props.width}px`)}`;
		}

		return `${rem(`${RECORD_COVER_SIZE}px`)}`;
	}};
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

	${above.large`
		justify-content: flex-start;
	`};
`;

export const Album = styled.img`
	width: ${(props: IAlbumCoverProps) => {
		if (props.width) {
			return `${rem(`${props.width}px`)}`;
		}

		return `${rem(`${RECORD_COVER_SIZE}px`)}`;
	}};
	height: ${(props: IAlbumCoverProps) => {
		if (props.width) {
			return `${rem(`${props.width}px`)}`;
		}

		return `${rem(`${RECORD_COVER_SIZE}px`)}`;
	}};
	z-index: 1;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	border-radius: ${rem("8px")};
	transition: transform 250ms;
	background-color: var(--color-gray7, #82889b);
	color: var(--color-white, #ffffff);
`;

export interface IAlbumCoverProps {
	url: string;
	name: string;
	artist: string;
	src: string;
	alt: string;
	width?: number;
}
