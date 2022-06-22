import { Playlist } from "./Playlist";
export type CategorizedPlaylists = {
  [key: string]: { [key: string]: Playlist[] };
};
