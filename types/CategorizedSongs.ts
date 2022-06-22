import { Song } from "./Song";

export type CategorizedSongs = {
  [key: string]: { [key: string]: { [key: string]: { [key: string]: Song[] } } };
};
