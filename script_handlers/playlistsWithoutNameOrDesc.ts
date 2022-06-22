import flatten from "flat";
import { CategorizedPlaylists } from "../types/CategorizedPlaylists";
import { Playlist } from "../types/Playlist";

const GetPlaylistsIdsWithoutNameOrDesc = (playlists: CategorizedPlaylists) => {
  let playlistsWithoutNameOrDesc: string[] = [];

  let playlistsObj: { [key: string]: Playlist } = flatten(playlists, { maxDepth: 3 });
  Object.keys(playlistsObj).map((key: string) => {
    const { description, displayName, playlistId } = playlistsObj[key];
    if (!description || !displayName) playlistsWithoutNameOrDesc.push(playlistId);
  });

  return playlistsWithoutNameOrDesc;
};

export default GetPlaylistsIdsWithoutNameOrDesc;
