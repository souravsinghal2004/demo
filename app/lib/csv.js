import fs from "fs";
import path from "path";
import csv from "csv-parser";

export const getQuestionsByJob = (job) => {
  return new Promise((resolve) => {
    const results = {};
    const filePath = path.join(process.cwd(), "data/jobs", `${job}.csv`);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const section = row.section;
        if (!results[section]) results[section] = [];
        results[section].push(row.question);
      })
      .on("end", () => resolve(results));
  });
};
