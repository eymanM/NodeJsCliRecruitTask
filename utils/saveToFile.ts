import fs from "fs";

export const SaveToJsonWithPrettyPrint = (obj: {}, fileName: string) => {
  const json = JSON.stringify(obj, null, 2);

  fs.writeFile(fileName, json, (err) => {
    if (err) console.log(`Error while saving data to ${fileName}`, err);
    else console.log(`JSON data is saved to ${fileName}`);
  });
};
