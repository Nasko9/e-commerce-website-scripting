import * as fs from "fs";

export const writeJSONToFile = (
  filename: string,
  data: { title: string; url: string }[]
) => {
  fs.writeFile(filename, JSON.stringify(data), err => {
    if (err) {
      throw err;
    }
    console.log(`Successfully saved data to ${filename}`);
  });
};
