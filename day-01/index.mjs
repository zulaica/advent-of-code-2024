#!/usr/bin/env node

import { open } from "fs/promises";

const file = await open(new URL("input.txt", import.meta.url));

const listA = [];
const listB = [];

for await (const line of file.readLines()) {
  const [a, b] = line.split(/\s+/).map(Number);

  listA.push(a);
  listB.push(b);
}

listA.sort();
listB.sort();

const totalDistance = listA.reduce(
  (accumulator, currentValue, currentIndex) =>
    accumulator + Math.abs(currentValue - listB[currentIndex]),
  0
);

console.info(`Total Distance: ${totalDistance}`);

let similarityScore = 0;

listA.forEach(
  (a) => (similarityScore += a * listB.filter((b) => a === b).length)
);

console.info(`Similarity Score: ${similarityScore}`);
