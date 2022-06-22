import flatten from "flat";

const SongsInLabel = (songs: { [key: string]: any }) => {
  let songsPerLabel: { label: string; amount: number }[] = [];
  Object.keys(songs).map((labelKey) => {
    let subtabelsFlatten: { [key: string]: any } = flatten(songs[labelKey], { maxDepth: 4 });
    songsPerLabel.push({ label: labelKey, amount: Object.keys(subtabelsFlatten).length });
  });

  return songsPerLabel;
};

const SongsInSubLabel = (songs: { [key: string]: any }) => {
  let songsPerSubLabel: { sublabel: string; amount: number }[] = [];
  let songsEntries = Object.entries(songs);

  songsEntries.forEach(([a, labelNestedObj]) => {
    Object.entries(labelNestedObj).forEach(([sublabel, data]) => {
      let sublabelToSongFlatten: { [key: string]: any } = flatten(data, { maxDepth: 3 });
      let songsAmount = Object.keys(sublabelToSongFlatten).length;
      let findedEntry = songsPerSubLabel.find((entry) => entry.sublabel == sublabel);
      if (!findedEntry) songsPerSubLabel.push({ sublabel: sublabel, amount: songsAmount });
      else findedEntry.amount += songsAmount;
    });
  });

  return songsPerSubLabel;
};

export { SongsInLabel, SongsInSubLabel };
