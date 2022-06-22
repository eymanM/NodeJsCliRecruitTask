import { CategorizedPlaylists } from "../types/CategorizedPlaylists";

const GetPlaylistsAmountInLocalization = (playlists: CategorizedPlaylists) => {
  let playlistsAmountInLocalization: { localization: string; amount: number }[] = [];

  let playlistsEntries: any[] = Object.entries(playlists);
  let playlistsEntriesLocalization = playlistsEntries.map(([_, element]) => element); // remove first level of nesting

  playlistsEntriesLocalization.forEach((playlistsLocalized: any[]) => {
    Object.entries(playlistsLocalized).forEach(([localizationName, item]) =>
      fillAmountTable(playlistsAmountInLocalization, localizationName, item)
    );
  });

  return playlistsAmountInLocalization;
};

const fillAmountTable = (
  playlistsAmountInLocalization: { localization: string; amount: number }[],
  localizationName: string,
  item: any
) => {
  let localizationObj = playlistsAmountInLocalization.find((item) => item.localization == localizationName);
  if (localizationObj) localizationObj.amount += item.length;
  else playlistsAmountInLocalization.push({ localization: localizationName, amount: 1 });
};

export default GetPlaylistsAmountInLocalization;
