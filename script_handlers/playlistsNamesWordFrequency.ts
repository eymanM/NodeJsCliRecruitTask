import flatten from "flat";
import { CategorizedPlaylists } from "../types/CategorizedPlaylists";
import { Playlist } from "../types/Playlist";

const GetPlaylistNamesPopularitySortedByAmount = (playlists: CategorizedPlaylists) => {
  let wordsFrequency: { [key: string]: number } = {};
  let flattenPlaylists: { [key: string]: Playlist } = flatten(playlists, { maxDepth: 3 });

  Object.entries(flattenPlaylists).forEach(([_, { displayName }]) => saveToFrequencyObj(displayName, wordsFrequency));

  Object.keys(wordsFrequency).forEach((word) => wordsFrequency[word] <= 1 && delete wordsFrequency[word]);

  let sortedWords = Object.entries(wordsFrequency).sort(([_, amount1], [__, amount2]) => amount2 - amount1);
  return sortedWords.map(([word, _]) => word);
};

const saveToFrequencyObj = (playlistDisplayName: string, wordsFrequency: { [key: string]: number }) => {
  let wordsArray: string[] = [];

  playlistDisplayName.split(" ").forEach((word) => word.length >= 3 && wordsArray.push(word));
  wordsArray.forEach((word) => (wordsFrequency[word] = wordsFrequency[word] ? (wordsFrequency[word] += 1) : 1));
};

export default GetPlaylistNamesPopularitySortedByAmount;
