#!/usr/bin/env node

import { open } from "fs/promises";

const reports = await parseInput();

let safeReports = 0;

for (const report of reports) {
  safeReports += Number(isSafe(report));
}

console.info(`Safe Reports: ${safeReports}`);

let safeReportsWithDampener = 0;

for (const report of reports) {
  const status = [];

  for (const index of report.keys()) {
    status.push(isSafe(report.toSpliced(index, 1)));
  }

  safeReportsWithDampener += status.some((isTrue) => isTrue);
}

console.info(`Safe Reports with Dampener: ${safeReportsWithDampener}`);

async function parseInput() {
  const file = await open(new URL("input.txt", import.meta.url));
  const lines = [];

  for await (const line of file.readLines()) {
    lines.push(line.split(/\s+/).map(Number));
  }

  return lines;
}

function isAscending(report) {
  return (
    JSON.stringify(report) === JSON.stringify(report.toSorted((a, b) => a - b))
  );
}

function isDescending(report) {
  return (
    JSON.stringify(report) === JSON.stringify(report.toSorted((a, b) => b - a))
  );
}

function isSafe(report) {
  if (!isAscending(report) && !isDescending(report)) return false;

  const differences = [];

  for (const index of report.keys()) {
    if (report[index + 1]) {
      differences.push(Math.abs(report[index] - report[index + 1]));
    }
  }

  return differences.every((difference) => difference >= 1 && difference <= 3);
}
