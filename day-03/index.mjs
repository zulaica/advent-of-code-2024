#!/usr/bin/env node

import { open } from "fs/promises";

const DIGITS = /\d{1,3}/g;
const MUL = /mul\(\d{1,3},\d{1,3}\)/gm;
const NEWLINES = /[\r\n]+/gm;

const input = await open(new URL("input.txt", import.meta.url));
const buffer = await input.readFile();
input.close();

const memory = buffer.toString().replace(NEWLINES, "");
const matches = [...memory.match(MUL)];

let sum = 0;

for (const mul of matches) {
  const [a, b] = mul.match(DIGITS);

  sum += a * b;
}

console.info(`Sum: ${sum}`);

const EXCLUSION = /(don't\(\).*?(do\(\)|$))/gm;
const conditionlMatches = [...memory.replace(EXCLUSION, "").match(MUL)];

let condSum = 0;

for (const cond of conditionlMatches) {
  const [a, b] = cond.match(DIGITS);

  condSum += a * b;
}

console.info(`Conditional Sum: ${condSum}`);
