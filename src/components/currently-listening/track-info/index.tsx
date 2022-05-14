/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

import LastPlayedSongCard from "./LastPlayedSongCard";
import { Track } from "../../../typings/index";

export function TrackInfo({ song }: { song: Track }) {
  return <LastPlayedSongCard key={song.name} song={song} />;
}