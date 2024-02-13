const disciplines = ["CC", "AL"];
const years = ["2022", "2023"];
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

await years.forEach((year) => {
  disciplines.forEach((discipline) => {
    months.forEach((month) => {
      const url =
        `https://www.fis-ski.com/DB/?sectorcode=${discipline}&seasoncode=${year}&seasonmonth=${month}-${year}`;
        const raw =  fetch(url);
        const html = await raw.text();
        console.log(html);
    });
  });
});