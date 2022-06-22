import got from "got";
import { SaveToJsonWithPrettyPrint } from "./utils/saveToFile.js";
import { Playlist } from "./types/Playlist";
import { PlaylistIdAndSongsLink } from "./types/PlaylistIdAndSongsLink";
import { CategorizedPlaylists } from "./types/CategorizedPlaylists.js";
import { Song } from "./types/Song.js";
import { CategorizedSongs } from "./types/CategorizedSongs.js";
let url: string = "https://storage.googleapis.com/songpop3-catalog/v1/latest/catalog.spp.json";

const downloadPlaylistsHandler = async (): Promise<[CategorizedPlaylists, PlaylistIdAndSongsLink[]]> => {
  let categorizedPlaylists: CategorizedPlaylists = {};
  let playlistIdAndSongsLink: PlaylistIdAndSongsLink[] = [];
  let response: Playlist[] = [];

  try {
    response = await got.get(url).json();
  } catch (error: any) {
    console.log("Error while downloading playlists ", error);
  }

  response.forEach((playlist) => {
    let { playlistId, songsLink, categoryId, locale } = playlist;
    playlistIdAndSongsLink.push({ playlistId, songsLink });

    [categoryId, locale] = [categoryId || "withoutCategory", locale || "notLocalized"];

    if (!(categoryId in categorizedPlaylists)) categorizedPlaylists[categoryId] = {};

    if (!(locale in categorizedPlaylists[categoryId])) categorizedPlaylists[categoryId][locale] = [];

    categorizedPlaylists[categoryId][locale].push(playlist);
  });

  return [categorizedPlaylists, playlistIdAndSongsLink];
};

const ScriptOneHandler = async () => {
  return downloadPlaylistsHandler().then(async ([CategorizedPlaylists, PlaylistsIdAndSongsLink]) => {
    let categorizedSongs: CategorizedSongs = {};

    await songsForAllPlaylistsHandler(PlaylistsIdAndSongsLink, categorizedSongs);
    SaveToJsonWithPrettyPrint(CategorizedPlaylists, "categorizedPlaylists.json");
    SaveToJsonWithPrettyPrint(categorizedSongs, "categorizedSongs.json");
  });
};

const addSongsForPlaylist = (playlistId: string, songs: Song[], categorizedSongs: CategorizedSongs) =>
  Promise.all(
    songs.map((song) => {
      song.playlistId = playlistId;
      const { label, subLabel, displayedArtist, displayedTitle } = song;

      categorizedSongs[label] = categorizedSongs[label] ?? {};
      categorizedSongs[label][subLabel] = categorizedSongs[label][subLabel] ?? {};

      categorizedSongs[label][subLabel][displayedArtist] = {};
      categorizedSongs[label][subLabel][displayedArtist][displayedTitle] = [];

      categorizedSongs[label][subLabel][displayedArtist][displayedTitle].push(song);
    })
  );

const songsForAllPlaylistsHandler = async (
  playlistIdAndSongsLink: PlaylistIdAndSongsLink[],
  categorizedSongs: CategorizedSongs
) => {
  let index = 1;
  let playlistsLength = playlistIdAndSongsLink.length;
  return Promise.all(
    playlistIdAndSongsLink.map(async ({ playlistId, songsLink }) => {
      let songs: Song[];
      try {
        songs = await got
          .get(songsLink, {
            timeout: { request: 100000 },
            retry: {
              limit: 4,
              calculateDelay: ({ computedValue }) => computedValue * 4,
            },
          })
          .json();
      } catch (err: any) {
        console.log(`Error(${err.message}}) while downloading ${songsLink}`);
        return false;
      }
      await addSongsForPlaylist(playlistId, songs, categorizedSongs);
      console.log(`Progress - ${index++}/${playlistsLength}`);
    })
  ).then((_) => console.log("songs are downloaded"));
};

await ScriptOneHandler();
