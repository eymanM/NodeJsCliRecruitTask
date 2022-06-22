import flatten from "flat";
import { CategorizedPlaylists } from "../types/CategorizedPlaylists";
import { Playlist } from "../types/Playlist";

const GetPlaylistsAmountInCategory = (playlists: CategorizedPlaylists) => {
  let playlistsAmountInCategory: { category: string; amount: number }[] = [];

  Object.keys(playlists).map((category) => {
    let flattenObjectsInCategory: { [key: string]: Playlist } = flatten(playlists[category], { maxDepth: 2 });
    let amountOfPlaylists = Object.keys(flattenObjectsInCategory).length;
    playlistsAmountInCategory.push({ category: category, amount: amountOfPlaylists });
  });
  return playlistsAmountInCategory;
};

export default GetPlaylistsAmountInCategory;
