const fs = require("fs");
const pdf = require("pdf-parse");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function dumpPDF(inputFile, page) {
  // Read initial data from PDF and just copy it out manually
  const databuffer = fs.readFileSync(inputFile);

  pdf(databuffer, { max: page }).then(data => {
    console.log(data);
  });
}

function saveSchedule(region, first, last) {
  // Add the first half of the schedule here (that's on the first page)
  const schedule = "";
  //  Add the second (continued) half of the schedule here (that's on the first page)
  const continued = "";

  const split = continued.split(/\n/);

  const combined = schedule.split(/\n/).map((curr, idx) => curr + split[idx]);

  fs.writeFileSync(
    `./schedules/${region}-${first}-${last}.txt`,
    combined.join("\n")
  );
}

function parseSchedules(region, first, last, startTimes, duration) {
  const baseDir = `output/${region}`;
  const data = fs.readFileSync(
    `./schedules/${region}-${first}-${last}.txt`,
    "utf8"
  );
  const rows = data.split(/\n/);

  fs.mkdirSync(baseDir, { recursive: true }); // create necessary output folders

  const defaultValues = stage => ({
    path: `${baseDir}/stage${stage}.csv`,
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

  for (let i = first; i <= last; i++) {
    const currStage = rows
      .filter(row => row.startsWith(`Stage ${i}`)) // only take the current stage's rows
      .map(
        row =>
          row
            .replace(`Stage ${i}`, "") // remove leading `Stage ${i}`
            .replace(/(\d)B/g, "$1;B") // delimit columns with ';'
            .replace(/Block /g, "") // remove "Block" keywords
            .replace(/ & /g, ",") // remove & delimiters
            .split(";") // split on ; delimiters
            .map((col, idx) => ({ [idx + 1]: col })) // wrangle each day to have correct headers for the csvWriter
      )
      .map((row, idx) => {
        const out = {
          from: startTimes[idx],
          duration: duration
        };

        Object.assign(out, ...row); // append `row` to `out`
        return out;
      });

    const csvWriter = createCsvWriter(defaultValues(i));
    csvWriter.writeRecords(currStage).then(() => {
      console.log(`Successfully wrote Stage ${i} in ${baseDir}/stage${i}.csv`);
    });
  }
}

function readAndParseSchedules(
  inputFile,
  region,
  lastPage,
  minStage,
  maxStage,
  startTimes,
  duration
) {
  //   dumpPDF(inputFile, lastPage);
  //   saveSchedule(region, minStage, maxStage);
  parseSchedules(region, minStage, maxStage, startTimes, duration);
}

const INPUT_FILE = "./schedules/schedule.pdf";
const REGION = "EL";

// readAndParseSchedules(
//   INPUT_FILE,
//   REGION,
//   8,
//   1,
//   4,
//   ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
//   "03:00"
// );

readAndParseSchedules(
  INPUT_FILE,
  REGION,
  10,
  5,
  8,
  [
    "23:00",
    "02:00",
    "05:00",
    "08:00",
    "11:00",
    "14:00",
    "17:00",
    "20:00",
    "23:00"
  ],
  "03:00"
);
