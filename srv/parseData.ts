import { readdir } from "node:fs/promises";
import { parse } from "node-html-parser";

// read all the files in the current directory
const fileNames = await readdir("../data");
// sort files
fileNames.sort();

//parse the files
fileNames.forEach(async (fileName) => {
    console.log(fileName)
  const file = await Bun.file(`../data/${fileName}`).text();
  const root = parse(file);
  const calendarData = root.querySelector("#calendardata.tbody");
  if (!calendarData) return;
  const rows = calendarData?.childNodes.filter((node) =>
    node.nodeType === 1
  ) as unknown as HTMLElement[];
  if (!rows) return;
  const data = rows.map((row) => {
    const cancelled = (row.querySelectorAll("div.status__item-wrapper")[1]
      .childNodes[3] as HTMLElement).getAttribute("title");
    const date = row.querySelectorAll("a")[1].textContent?.replaceAll(
      "\n",
      "",
    ) as string;
    const regex = /\b(19|20)\d{2}\b/;
    const year = Number(regex.exec(date)?.[0]); // Add null check
    const place = row.querySelectorAll("a")[2].childNodes[1].textContent
      ?.replaceAll("\n", "") as string;
    const country = row.querySelectorAll("a")[5].childNodes[1].textContent
      ?.trim() as string;
    const disc = row.querySelectorAll("a")[6].textContent?.trim();
    const categories = row.querySelectorAll("a")[7].childNodes[1].childNodes[1]
      .textContent?.trim().split(" • ");
    const events = row.querySelectorAll("a")[7].childNodes[1].childNodes[3]
      .textContent?.trim().split(" ");
    const gender = row.querySelectorAll("a")[8].childNodes[1].childNodes[3]
      .textContent?.trim().replaceAll(" ", "").replaceAll("\n", " ").split(" ");
    return {
      id: Number(row.id),
      cancelled: cancelled === "Cancelled",
      date,
      year,
      place,
      country,
      disc,
      categories,
      events,
      gender,
    };
  });
});

// const file = await Bun.file(`../data/2020-01-CC.html`).text();
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
