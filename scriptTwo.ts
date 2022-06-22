#!/usr/bin/env node
import fs from "fs";
import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { CategorizedSongs } from "./types/CategorizedSongs.js";
import { CategorizedPlaylists } from "./types/CategorizedPlaylists.js";

import GetPlaylistNamesPopularitySortedByAmount from "./script_handlers/playlistsNamesWordFrequency.js";
import SongOccurenceInPlaylists from "./script_handlers/findSongsInPlaylists.js";
import GetPlaylistsAmountInCategory from "./script_handlers/playlistsInCategory.js";
import GetPlaylistsAmountInLocalization from "./script_handlers/playlistsInLocalization.js";
import GetPlaylistsIdsWithoutNameOrDesc from "./script_handlers/playlistsWithoutNameOrDesc.js";
import { SongsInLabel, SongsInSubLabel } from "./script_handlers/songsLabelSublabel.js";
import PlaylistWithYearOrDecadeInName from "./script_handlers/playlistWithYearOrDecade.js";

const playlists: CategorizedPlaylists = JSON.parse(fs.readFileSync("categorizedPlaylists.json").toString());
const songs: CategorizedSongs = JSON.parse(fs.readFileSync("categorizedSongs.json").toString());

console.log(chalk.yellow(figlet.textSync("Script 2", { horizontalLayout: "full" })));
program
  .command("mostpopularWords")
  .description("Most popular words with length >= 3, without one occuring words")
  .action(() => console.log(GetPlaylistNamesPopularitySortedByAmount(playlists)));

program
  .command("songInPlaylistsAmount")
  .description("Array {songName: occurenceInAllPlaylistAmount}")
  .action(() => console.log(SongOccurenceInPlaylists(songs)));

program
  .command("playlistsInCategory")
  .description("Amount of playlists in category")
  .action(() => console.log(GetPlaylistsAmountInCategory(playlists)));

program
  .command("playlistsInLocalization")
  .description("Amount of playlists in localization")
  .action(() => console.log(GetPlaylistsAmountInLocalization(playlists)));

program
  .command("playlistsWithoutNameOrDesc")
  .description("Get id's of playlists without name or description")
  .action(() => console.log(GetPlaylistsIdsWithoutNameOrDesc(playlists)));

program
  .command("songsInLabelAmount")
  .description("Array {label: amount of songs in this label}")
  .action(() => console.log(SongsInLabel(songs)));

program
  .command("songsInSubLabelAmount")
  .description("Array {sub label: amount of songs in this sub label}")
  .action(() => console.log(SongsInSubLabel(songs)));

program
  .command("amountOfPlaylistWithYearOrDecade")
  .description("Amount of playlists with year or decade in name")
  .action(() => console.log(PlaylistWithYearOrDecadeInName(playlists)));

program.on("command:*", () => {
  console.error(chalk.red("Invalid command: ", program.args.join(" ")) + "\n");
  console.error(chalk.red("See --help for a list of available commands.") + "\n");

  process.exit(1);
});

program.parse(process.argv);
