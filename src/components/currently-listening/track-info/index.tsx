import LastPlayedSongCard from "./LastPlayedSongCard";
import { Track } from "../../../typings/index";

export function TrackInfo({ song }: { song: Track }) {
  return <LastPlayedSongCard key={song.name} song={song} />;
}
