import { readdir } from "node:fs/promises";
import { parse } from "node-html-parser";

const seasons = await readdir("data").then((data) =>
  data.filter((name: string) => name !== ".DS_Store").sort()
);

console.log(seasons);

const months = [
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
];

seasons.forEach(async (season) => {
  months.forEach(async (month, index) => {
    const file = await Bun.file(
      `data/${season}/${index < 8 ? Number(season) - 1 : season}-${month}.html`,
    )
      .text();
    const root = parse(file);
    const calendarData = root.querySelector("#calendardata.tbody");
    if (calendarData?.innerText.includes("No events found")) {return}
    const rows = calendarData?.childNodes.filter((node) =>
      node.nodeType === 1
    ) as unknown as HTMLElement[];
    if (rows === undefined) {
      console.log(
        `No events found for ${season}/${index < 8 ? Number(season) - 1 : season}-${month}.html`);
      return;
    }
    const data = rows.map((row) => {
      const cancelled = (row.querySelectorAll("div.status__item-wrapper")[1]
        .childNodes[3] as HTMLElement).getAttribute("title");
      const date = row.querySelectorAll("a")[1].textContent?.replaceAll(
        "\n",
        "",
      ) as string;
      const place = row.querySelectorAll("a")[2].childNodes[1].textContent
        ?.replaceAll("\n", "") as string;
      const country = row.querySelectorAll("a")[5].childNodes[1].textContent
        ?.trim() as string;
      const disc = row.querySelectorAll("a")[6].textContent?.trim();
      const categories = row.querySelectorAll("a")[7].childNodes[1]
        .childNodes[1].textContent?.trim().split(" • ");
      const events = row.querySelectorAll("a")[7].childNodes[1].childNodes[3]
        .textContent?.trim().split(" ");
      const gender = row.querySelectorAll("a")[8].childNodes[1].childNodes[3]
        .textContent?.trim().replaceAll(" ", "").replaceAll("\n", " ").split(
          " ",
        );
      return {
        id: Number(row.id),
        cancelled: cancelled === "Cancelled",
        season: Number(season),
        month: Number(month),
        year: index < 8 ? Number(season) - 1 : Number(season),
        date,
        place,
        country,
        disc,
        categories,
        events,
        gender,
      };
    });
    Bun.write(
      `./out/${season}/${
        index < 8 ? Number(season) - 1 : season
      }-${month}.json`,
      JSON.stringify(data),
    );
  });
});

//parse the files
// fileNames.forEach(async (fileName) => {
//   const file = await Bun.file(`data/${fileName}`).text();
//   const root = parse(file);
//   const calendarData = root.querySelector("#calendardata.tbody");
//   const rows = calendarData?.childNodes.filter((node) =>
//       node.nodeType === 1
//   ) as unknown as HTMLElement[];
//   const data = rows.map((row) => {
//     if (row.querySelectorAll("div.status__item-wrapper")[1] === undefined) {
//         console.log(fileName)
//         return
//     }
//       const cancelled =
//           (row.querySelectorAll("div.status__item-wrapper")[1]
//               .childNodes[3] as HTMLElement).getAttribute("title");
//           const date = row.querySelectorAll("a")[1].textContent?.replaceAll('\n','') as string;
//           const regex = /\b(19|20)\d{2}\b/;
//           const year = Number(regex.exec(date)?.[0]); // Add null check
//           const place = row.querySelectorAll("a")[2].childNodes[1].textContent?.replaceAll('\n','') as string;
//           const country = row.querySelectorAll("a")[5].childNodes[1].textContent?.trim() as string;
//           const disc = row.querySelectorAll("a")[6].textContent?.trim();
//           const categories = row.querySelectorAll("a")[7].childNodes[1].childNodes[1].textContent?.trim().split(" • ");
//           const events = row.querySelectorAll("a")[7].childNodes[1].childNodes[3].textContent?.trim().split(" ");
//           const gender = row.querySelectorAll("a")[8].childNodes[1].childNodes[3].textContent?.trim().replaceAll(' ','').replaceAll('\n',' ').split(' ');
//       return { id: Number(row.id), cancelled: cancelled === "Cancelled", date, year, place, country, disc, categories, events, gender};
//   });
//   Bun.write(`out/${fileName.split(".")[0]}.json`, JSON.stringify(data))

//   });

// const file = await Bun.file(`data/2023-03.html`).text();
// const root = parse(file);
// const calendarData = root.querySelector("#calendardata.tbody");
// const rows = calendarData?.childNodes.filter((node) =>
//     node.nodeType === 1
// ) as unknown as HTMLElement[];
// const data = rows.map((row) => {
//     const cancelled =
//         (row.querySelectorAll("div.status__item-wrapper")[1]
//             .childNodes[3] as HTMLElement).getAttribute("title");
//         const date = row.querySelectorAll("a")[1].textContent?.replaceAll('\n','') as string;
//         const regex = /\b(19|20)\d{2}\b/;
//         const year = Number(regex.exec(date)?.[0]); // Add null check
//         const place = row.querySelectorAll("a")[2].childNodes[1].textContent?.replaceAll('\n','') as string;
//         const country = row.querySelectorAll("a")[5].childNodes[1].textContent?.trim() as string;
//         const disc = row.querySelectorAll("a")[6].textContent?.trim();
//         const categories = row.querySelectorAll("a")[7].childNodes[1].childNodes[1].textContent?.trim().split(" • ");
//         const events = row.querySelectorAll("a")[7].childNodes[1].childNodes[3].textContent?.trim().split(" ");
//         const gender = row.querySelectorAll("a")[8].childNodes[1].childNodes[3].textContent?.trim().replaceAll(' ','').replaceAll('\n',' ').split(' ');
//     return { id: Number(row.id), cancelled: cancelled === "Cancelled", date, year, place, country, disc, categories, events, gender};
// });
// console.log(data);
