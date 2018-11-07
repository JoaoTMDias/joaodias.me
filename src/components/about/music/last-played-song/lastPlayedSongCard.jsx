// Libraries
import React from 'react';
import styled from 'styled-components';

// ///////////////////////////////
// /// Component: lastPlayedSongCard
// /// @type: functional stateless component
// /// @description:  componentDescription
// ///////////////////////////////
const LastPlayedSongCard = props => (
  <LastPlayedSong>
    <a
      href={props.song.url}
      title={`Click/Enter to listen to ${props.song.name} by ${props.song.artist['#text']} on Last.fm`}
    >
      <Cover>
        <AlbumCover
          src={props.song.image[2]['#text']}
          height="174"
          alt={`Album Cover for ${props.song.album['#text']}`}
        />
      </Cover>
    </a>

    <InfoContainer>
      <h2 className="track">
        <a href={props.song.url} aria-label={`Song Name: ${props.song.name}`} title={`${props.song.name}`} tabIndex="0">
          {props.song.name}
        </a>
      </h2>
      <p className="artist" aria-label={`Artist/Band Name: ${props.song.artist['#text']}`} tabIndex="0">
        {props.song.artist['#text']}
      </p>
      <span className="album" aria-label={`Album Name: ${props.song.album['#text']}`} tabIndex="0">
        {props.song.album['#text']}
      </span>
    </InfoContainer>
  </LastPlayedSong>
);

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

const RECORD_COVER_SIZE = 174;

const Cover = styled.figure`
  width: ${RECORD_COVER_SIZE}px;
  height: ${RECORD_COVER_SIZE}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--global-margin);

  &:hover {
  }

  img {
    position: absolute;
  }

  @media ${props => props.theme.breakpointLarge} {
    justify-content: flex-start;
  }
`;

const AlbumCover = styled.img`
  width: ${RECORD_COVER_SIZE}px;
  height: ${RECORD_COVER_SIZE}px;
  z-index: 1;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  transition: transform 250ms;
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

export default LastPlayedSongCard;
