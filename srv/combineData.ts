import { readdir } from "node:fs/promises";

const seasons = await readdir("out").then((data) =>
  data.filter((name: string) => name !== ".DS_Store").sort()
);

let combinedData: any[] = [];

const seasonPromises = seasons.map(async (season) => {
  const fileNames = await readdir(`out/${season}`).then((data) =>
    data.filter((name: string) => name !== ".DS_Store").sort()
  );
  const filePromises = fileNames.map(async (fileName) => {
    const data = await Bun.file(`out/${season}/${fileName}`).json();
    combinedData = [...combinedData, ...data];
    console.log(season, fileName, "done");
  });
  await Promise.all(filePromises);
});

await Promise.all(seasonPromises);
console.log(combinedData.length + " events found");
Bun.write("out/combinedData.json", JSON.stringify(combinedData));
