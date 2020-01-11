const fs = require("fs");
const pdf = require("pdf-parse");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Read initial data from PDF and just copy it out manually
// const databuffer = fs.readFileSync("./schedule.pdf");

// pdf(databuffer, { max: 7 }).then(data => {
//   console.log(data);
// });

// const oneToFour1 =
//   "TimeStage1st2nd3rd4th5th6th7th8th9th10th11th12th13th14th15th16th\n" +
//   "Stage 1Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7\n" +
//   "Stage 2Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12\n" +
//   "Stage 3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17\n" +
//   "Stage 4Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3\n" +
//   "Stage 1Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8\n" +
//   "Stage 2Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13\n" +
//   "Stage 3Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18\n" +
//   "Stage 4Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4\n" +
//   "Stage 1Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9\n" +
//   "Stage 2Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14\n" +
//   "Stage 3Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19\n" +
//   "Stage 4Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5\n" +
//   "Stage 1Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10\n" +
//   "Stage 2Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15\n" +
//   "Stage 3Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1\n" +
//   "Stage 4Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6\n" +
//   "Stage 1Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11\n" +
//   "Stage 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16\n" +
//   "Stage 3Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2\n" +
//   "Stage 4Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7\n" +
//   "Stage 1Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12\n" +
//   "Stage 2Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17\n" +
//   "Stage 3Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3\n" +
//   "Stage 4Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8\n" +
//   "Stage 1Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13\n" +
//   "Stage 2Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18\n" +
//   "Stage 3Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4\n" +
//   "Stage 4Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9\n" +
//   "Stage 1Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14\n" +
//   "Stage 2Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19\n" +
//   "Stage 3Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5\n" +
//   "Stage 4Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10\n";

// const oneToFour2 =
//   "17th18th19th20th21st22nd23rd24th25th26th27th28th29th30th31st\n" +
//   "Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13\n" +
//   "Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18\n" +
//   "Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4\n" +
//   "Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9\n" +
//   "Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14\n" +
//   "Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19\n" +
//   "Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5\n" +
//   "Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10\n" +
//   "Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15\n" +
//   "Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1\n" +
//   "Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6\n" +
//   "Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11\n" +
//   "Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16\n" +
//   "Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2\n" +
//   "Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7\n" +
//   "Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12\n" +
//   "Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17\n" +
//   "Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3\n" +
//   "Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8\n" +
//   "Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13\n" +
//   "Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18\n" +
//   "Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4\n" +
//   "Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9\n" +
//   "Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14\n" +
//   "Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1Block 9Block 17Block 6Block 14Block 3Block 11Block 19\n" +
//   "Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6Block 9 & 14Block 17 & 3Block 6 & 11Block 14 & 19Block 3 & 8Block 11 & 16Block 19 & 5\n" +
//   "Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11Block 9,14,19Block 17,3,8Block 6,11,16Block 14,19,5Block 3,8,13Block 11,16,2Block 19,5,10\n" +
//   "Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16Block 9,14,19,5Block 17,3,8,13Block 6,11,16,2Block 14,19,5,10Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15\n" +
//   "Block 3Block 11Block 19Block 8Block 16Block 5Block 13Block 2Block 10Block 18Block 7Block 15Block 4Block 12Block 1\n" +
//   "Block 3 & 8Block 11 & 16Block 19 & 5Block 8 & 13Block 16 & 2Block 5 & 10Block 13 & 18Block 2 & 7Block 10 & 15Block 18 & 4Block 7 & 12Block 15 & 1Block 4 & 9Block 12 & 17Block 1 & 6\n" +
//   "Block 3,8,13Block 11,16,2Block 19,5,10Block 8,13,18Block 16,2,7Block 5,10,15Block 13,18,4Block 2,7,12Block 10,15,1Block 18,4,9Block 7,12,17Block 15,1,6Block 4,9,14Block 12,17,3Block 1,6,11\n" +
//   "Block 3,8,13,18Block 11,16,2,7Block 19,5,10,15Block 8,13,18,4Block 16,2,7,12Block 5,10,15,1Block 13,18,4,9Block 2,7,12,17Block 10,15,1,6Block 18,4,9,14Block 7,12,17,3Block 15,1,6,11Block 4,9,14,19Block 12,17,3,8Block 1,6,11,16";

// const split = oneToFour2.split(/\n/);

// const oneToFourCombined = oneToFour1
//   .split(/\n/)
//   .map((curr, idx) => curr + split[idx]);

// console.log(fs.writeFileSync("EL-1-4.txt", oneToFourCombined.join("\n")));

const data = fs.readFileSync("./EL-1-4.txt", "utf8");

const startTimes = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00"
];

const duration = "03:00";

const rows = data.split(/\n/);

const defaultValues = stage => ({
  path: `stage${stage}.csv`,
  fieldDelimiter: ";",
  header: [
    { id: "from", title: "FROM" },
    { id: "duration", title: "DURATION" },
    ...[...Array(31).keys()].map(k => {
      const idx = k + 1;
      return {
        id: idx,
        title: idx
      };
    })
  ]
});

for (let i = 1; i <= 4; i++) {
  console.log(`Processing Stage ${i}:`);
  const currStage = rows
    .filter(row => row.startsWith(`Stage ${i}`))
    .map(str => str.replace(`Stage ${i}`, "")) // remove leading `Stage ${i}`
    .map(str => str.replace(/(\d)B/g, "$1;B")) // delimit columns with ';'
    .map(str => str.replace(/Block /g, "")) // remove "Block" keywords
    .map(str => str.replace(/ & /g, ",")) // remove & delimiters
    .map(
      str => str.split(";").map((col, idx) => ({ [idx + 1]: col })) // wrangle each day to have correct headers for the csvWriter
    )
    .map((row, idx) => {
      const out = {
        // ...row, // FIXME: why can't I spread here?
        from: startTimes[idx],
        duration: duration
      };

      Object.assign(out, ...row);
      return out;
    });

  const csvWriter = createCsvWriter(defaultValues(i));
  csvWriter
    .writeRecords(currStage) // returns a promise
    .then(() => {
      console.log(`Successfully wrote Stage ${i}`);
    });
}
