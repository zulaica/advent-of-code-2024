#!/usr/bin/env node

import { open } from "fs/promises";

const MUL = /mul\(\d{1,3},\d{1,3}\)/gm;
const input = await open(new URL("input.txt", import.meta.url));
const buffer = await input.readFile();
input.close();
const matches = [...buffer.toString().match(MUL)];

let sum = 0;

for (const mul of matches) {
  const DIGITS = /\d{1,3}/g;
  const [a, b] = mul.match(DIGITS);

  sum += a * b;
}

console.info(`Sum: ${sum}`);
