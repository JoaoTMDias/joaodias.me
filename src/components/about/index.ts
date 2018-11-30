import { asyncComponent } from "../../components/index";

const LogoCarousel = asyncComponent(() => {
  return import(`./logo-carousel/logo-carousel.component`);
});

const LastPlayedSong = asyncComponent(() => {
  return import(`./music/last-played-song/last-played-song.component`);
});

const LastPlayedSongCard = asyncComponent(() => {
  return import(`./music/last-played-song/last-played-song-card.component`);
});

export { LogoCarousel, LastPlayedSong, LastPlayedSongCard };
