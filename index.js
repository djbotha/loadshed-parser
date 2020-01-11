const fs = require("fs");
const pdf = require("pdf-parse");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function readPDF(inputFile, page, region, first, last) {
  // Read initial data from PDF and just copy it out manually
  const databuffer = fs.readFileSync(inputFile);

  pdf(databuffer, { max: page }).then(data => {
    console.log("Loaded PDF");
  });

  // Add the first half of the schedule here (that's on the first page)
  const schedule = "";
  //  Add the second (continued) half of the schedule here (that's on the first page)
  const continued = "";

  const split = continued.split(/\n/);

  const combined = schedule.split(/\n/).map((curr, idx) => curr + split[idx]);

  fs.writeFileSync(`./${region}-${first}-${last}.txt`, combined.join("\n"));
}

function parseFiles(region, first, last, startTimes, duration) {
  const data = fs.readFileSync(`./${region}-${first}-${last}.txt`, "utf8");
  const rows = data.split(/\n/);

  const defaultValues = stage => ({
    path: `output/stage${stage}.csv`,
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
          from: startTimes[idx],
          duration: duration
        };

        Object.assign(out, ...row);
        return out;
      });

    const csvWriter = createCsvWriter(defaultValues(i));
    csvWriter.writeRecords(currStage).then(() => {
      console.log(`Successfully wrote Stage ${i}`);
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
  //   readPDF(inputFile, lastPage, region, minStage, maxStage);
  parseFiles(region, minStage, maxStage, startTimes, duration);
}

readAndParseSchedules(
  "./schedule.pdf",
  "EL",
  8,
  1,
  4,
  ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
  "03:00"
);

readAndParseSchedules(
  "./schedule.pdf",
  "EL",
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
