import flatten from "flat";
import { CategorizedPlaylists } from "../types/CategorizedPlaylists";

const PlaylistWithYearOrDecadeInName = (playlists: CategorizedPlaylists) => {
  let amountOfPlaylistsWithDecadeOrYear = 0;
  let flattenPlaylists: { [key: string]: any } = flatten(playlists, { maxDepth: 3 });
  let yearRegexInString = "[12][0-9]{3}";
  let decadeRegexInString = "[0-9]{1}'s";

  Object.entries(flattenPlaylists).map(([_, value]) => {
    const { displayName } = value;

    if (displayName.match(decadeRegexInString)) {
      amountOfPlaylistsWithDecadeOrYear += 1;
      return false;
    }
    if (displayName.match(yearRegexInString)) amountOfPlaylistsWithDecadeOrYear += 1;
  });

  return amountOfPlaylistsWithDecadeOrYear;
};

export default PlaylistWithYearOrDecadeInName;
