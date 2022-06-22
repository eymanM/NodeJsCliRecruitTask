import { CategorizedSongs } from "../types/CategorizedSongs";

const SongOccurenceInPlaylists = (songs: CategorizedSongs, sort: boolean = false) => {
  let songsOccurence: { song: string; occurence: number }[] = [];
  fillSongsInPlaylistsAmount(songs, songsOccurence);
  if (sort) songsOccurence = songsOccurence.sort((element1, element2) => element2.occurence - element1.occurence);

  return sort ? songsOccurence.sort((item1, item2) => item2.occurence - item1.occurence) : songsOccurence;
};

const fillSongsInPlaylistsAmount = (obj: any, songsOccurence: { song: string; occurence: number }[]) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== "object") return false;
    if (!("songId" in obj[key])) fillSongsInPlaylistsAmount(obj[key], songsOccurence);
    let songName: string = `${obj[key].displayedArtist}-${obj[key].displayedTitle}`;
    let findedSameSong = songsOccurence.find((occurences) => occurences.song === songName);

    if (!findedSameSong) songsOccurence.push({ song: songName, occurence: obj.length });
    else findedSameSong.occurence += obj.length;
  });
};
export default SongOccurenceInPlaylists;
