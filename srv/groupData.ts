const srcData = await Bun.file("out/combinedData.json").json();//.then((data) => data.filter((event) => event.disc === "CC"));
const bySeason = srcData.reduce((acc, event) => {
  if (acc.some((e) => e.season === event.season)) {
    const newAcc = acc.map((f) => {
      if (f.season === event.season) {
        return {
          season: event.season,
          cancelled: f.cancelled + (event.cancelled ? 1 : 0),
          completed: f.completed + (event.cancelled ? 0 : 1),
        };
      }
      return f;
    });
    return newAcc;
  }
  return [...acc, {
    season: event.season,
    cancelled: event.cancelled ? 1 : 0,
    completed: event.cancelled ? 0 : 1,
  }];
}, []);

const sorted = bySeason.sort((a, b) => a.season - b.season);

await Bun.write("../src/assets/complete.json", JSON.stringify(sorted));

// if (acc.some((e) => e.season === event.season)) {
//   const index = acc.findIndex((e) => e.season === event.season);
//   return [...acc.splice(index, 1), {
//     season: event.season,
//     cancelled: acc.filter((e) => e.season === event.season)[0].cancelled + (event.cancelled ? 1 : 0),
//     completed: acc.filter((e) => e.season === event.season)[0].completed + (event.cancelled ? 0 : 1),
//   }];
// }
//   return [...acc, {
//       season: event.season,
//       cancelled: event.cancelled ? 1 : 0,
//       completed: event.cancelled ? 0 : 1,
//   }];

// 
export {};
