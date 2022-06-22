import flatten from "flat";
import { exec } from "child_process";
import { CategorizedSongs } from "../types/CategorizedSongs";
import { Song } from "../types/Song";

const spotifyMainUrl = "https://open.spotify.com/track/";

const OpenSpotifyWithSong = (title: string, songs: CategorizedSongs) => {
  title = title.toLowerCase();

  const flattenToArtist: { [key: string]: Song } = flatten(songs, { maxDepth: 5 });
  Object.entries(flattenToArtist).forEach(([_, song]: [string, Song]) => {
    const { displayedTitle, spotify } = song;
    if (displayedTitle.toLowerCase() == title && spotify) buildAndOpenUrl(spotify);
  });
};

const buildAndOpenUrl = (spotifySongData: string) => {
  const splitted = spotifySongData.split(":");
  const spotifyId = splitted.at(-1);
  exec(`start ${spotifyMainUrl + spotifyId}`);
};

export default OpenSpotifyWithSong;
