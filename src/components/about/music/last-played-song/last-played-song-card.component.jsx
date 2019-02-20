// Libraries
import React from 'react';
import styled from 'styled-components';

// Components
import AlbumCover from './album-cover.component';

// ///////////////////////////////
// /// Component: lastPlayedSongCard
// /// @type: functional stateless component
// /// @description:  componentDescription
// ///////////////////////////////
export const LastPlayedSongCard = props => {
  const { song } = props;
  return (
    <LastPlayedSong>
      <AlbumCover
        url={song.url}
        name={song.name}
        artist={song.artist[`#text`]}
        src={song.image[2][`#text`]}
        alt={`Album Cover for ${song.album[`#text`]}`}
      />

      <InfoContainer>
        <h2 className="track">
          <a
            href={song.url}
            aria-label={`Song Name: ${song.name}`}
            title={`${song.name}`}
            tabIndex="0"
          >
            {song.name}
          </a>
        </h2>
        <p
          className="artist"
          aria-label={`Artist/Band Name: ${song.artist[`#text`]}`}
          tabIndex="0"
        >
          {song.artist[`#text`]}
        </p>
        <span
          className="album"
          aria-label={`Album Name: ${song.album[`#text`]}`}
          tabIndex="0"
        >
          {song.album[`#text`]}
        </span>
      </InfoContainer>
    </LastPlayedSong>
  );
};

const LastPlayedSong = styled.div`
  width: 100%;
  max-width: 30rem;
  min-width: 20rem;
  flex-direction: column;
  display: flex;
  margin: 0 auto;
  align-items: center;

  @media ${props => props.theme.breakpointLarge} {
    max-width: 40rem;
    min-width: 35rem;
  }
`;

const InfoContainer = styled.div`
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
    color: var(--color-gray9);
  }

  .album {
    font-size: 0.875rem;
    color: var(--color-gray8);
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
`;
