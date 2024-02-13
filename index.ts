const disciplines = ["CC", "AL"];
const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010",  "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994"];
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

const getRawData = async (url: string) => {
    const raw = await fetch(url);
    const html = await raw.text();
    return html;
    
}

years.forEach((year) => {
  disciplines.forEach((discipline) => {
    months.forEach(async (month) => {
      const url =
        `https://www.fis-ski.com/DB/?sectorcode=${discipline}&seasoncode=${year}&seasonmonth=${month}-${year}`;
        const html = await getRawData(url);
        Bun.write(`./data/${year}-${month}-${discipline}.html`, html);
        console.log(year, month, discipline, "done")
    });
  });
});