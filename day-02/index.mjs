#!/usr/bin/env node

import { open } from "fs/promises";

const file = await open(new URL("input.txt", import.meta.url));

const reports = [];

for await (const line of file.readLines()) {
  reports.push(line.split(/\s+/).map(Number));
}

let safeReports = 0;

for (const report of reports) {
  const isAscending =
    JSON.stringify(report) === JSON.stringify(report.toSorted((a, b) => a - b));
  const isDescending =
    JSON.stringify(report) === JSON.stringify(report.toSorted((a, b) => b - a));
  let isSafe = false;

  if (isAscending || isDescending) {
    for (const index of report.keys()) {
      const difference = Math.abs(report[index] - report[index + 1]);

      if (Number.isNaN(difference)) break;

      if (difference >= 1 && difference <= 3) {
        isSafe = true;
      } else {
        isSafe = false;
        break;
      }
    }
  }

  if (isSafe) {
    safeReports += 1;
  }
}

console.info(`Safe Reports: ${safeReports}`);
