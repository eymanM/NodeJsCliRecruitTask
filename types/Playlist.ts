export type Playlist = {
  categoryId: string;
  keyCost: number;
  playlistId: string;
  description: string;
  artist: boolean;
  fieldOnly?: string | null;
  popularity: number;
  artwork: string;
  songsLink: string;
  locale?: string | null;
  replacing?: string | null;
  adultOnly: boolean;
  displayName: string;
};
