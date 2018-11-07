// Libraries
import React, { PureComponent } from 'react';
import styled from 'styled-components';

// Components
import asyncComponent from '../../../hoc/asyncComponent';

// Services
import MusicServices from '../../../../data/services/external-services';

const LastPlayedSongCard = asyncComponent(() => {
  return import(`./lastPlayedSongCard`);
});

/** ********
 ** Class: LastPlayedSong
 ** @type: Class
 ** @description: Retrieves info from Last.fm and displays on the widget
 ********* */
class LastPlayedSong extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      LastPlayedSong: [],
    };
  }

  componentDidMount() {
    this.fetchLatestSong();
  }

  componentWillUnmount() {
    this.state = {
      LastPlayedSong: [],
    };
  }

  fetchLatestSong() {
    MusicServices.getLatestSong()
      .then(response => {
        if (response.data) {
          this.setState({
            LastPlayedSong: response.data.recenttracks.track,
          });
        }
      })
      .catch(error => console.error('erro no lastfm: ', error));
  }

  renderLastPlayedSong() {
    const numberofSongs = 1;

    const LatestSong = this.state.LastPlayedSong.slice(0, numberofSongs).map(song => (
      <LastPlayedSongCard key={song.name} song={song} />
    ));

    return LatestSong;
  }

  render() {
    // console.log(this.state);

    return (
      <section id="last-played-song" className="l__container l__section">
        <div className="l__row">
          <Title tabIndex="0">Currently listening to...</Title>
          {this.renderLastPlayedSong()}
        </div>
      </section>
    );
  }
}

const Title = styled.h2`
  color: var(--color-gray8, ${props => props.theme.gray8});
  text-align: center;
  font-size: 1.125rem;
  font-family: var(--body-font-family, ${props =>props.theme.bodyFontFamily});
`;

export default LastPlayedSong;
