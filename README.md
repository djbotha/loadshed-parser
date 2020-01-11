# Loadshed Parser

Small application to handle the parsing of [East London's loadshedding schedule](https://drive.google.com/file/d/1peHb083rJ3h4jUiJaWpsaW6Zt5h5v2D2/view).

Built to assist the team from [Eskom Se Push](https://sepush.co.za/).

## Installation

```
yarn
```

## Running

Make sure to read [below](#reading-the-government-schedule) before proceeding!

```
yarn start
```

### Reading the government schedule

There was no easy way to do this. The best solution I came up with was to read the PDF with `pdf-parse`, dump the text to stdout (with `dumpPDF()`) and copy it into two variables (`schedule` and `continued`). The PDF dump will split the two pages, so after storing the two pages' table content, re-run the `saveSchedule()` function. This will concatenate those two variables in order to store the schedule in a single txt file.

### Parsing the schedule

After the manual process above, you should have files similar to `EL-1-4.txt` and `EL-5-8.txt`. Next, run the `parseSchedules()` function with the appropriate arguments (see my examples) and you'll have an ESP-friendly schedule to dump out.
