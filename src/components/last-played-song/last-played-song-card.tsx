// Libraries
import React from "react";
import AlbumCover from "./album-cover";
import { ITrack } from "./types";
import { LastPlayedSong, InfoContainer } from "./styles";

export interface ILastPlayedSongCardProps {
	song: ITrack;
}

/**
 * Last Played Song Card
 *
 * @export
 * @param {ILastPlayedSongCardProps} props
 * @returns
 */
export const LastPlayedSongCard: React.FunctionComponent<ILastPlayedSongCardProps> = ({ song }) => {
	return (
		<LastPlayedSong>
			<AlbumCover
				url={song.url}
				name={song.name}
				artist={song.artist["#text"]}
				src={song.image[2]["#text"]}
				alt={`Album Cover for ${song.album["#text"]}`}
			/>

			<InfoContainer>
				<h2 className="track">
					<a
						href={song.url}
						data-testid="last-played-title"
						aria-label={`Song Name: ${song.name}`}
						title={`${song.name}`}
					>
						{song.name}
					</a>
				</h2>
				<p className="artist" data-testid="last-played-artist" aria-label={`Artist/Band Name: ${song.artist["#text"]}`}>
					{song.artist["#text"]}
				</p>
				<span className="album" data-testid="last-played-album" aria-label={`Album Name: ${song.album["#text"]}`}>
					{song.album["#text"]}
				</span>
			</InfoContainer>
		</LastPlayedSong>
	);
};

export default LastPlayedSongCard;
