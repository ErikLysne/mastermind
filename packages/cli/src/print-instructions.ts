import chalk from "chalk";
import { codePegColorDisplayMap } from "./code-peg-color-display-map.js";
import { keyPegColorDisplayMap } from "./key-peg-color-display-map.js";

export function printInstructions(): void {
  console.log(chalk.bold("Welcome to Master Mind!"));
  console.log("\n\n");
  console.log(chalk.underline("HOW TO PLAY"));
  console.log(
    "1. Attempt to guess the right combination by entering a combination of four colors, separated by space."
  );
  console.log(
    `   Example: ${chalk.red("red")} ${chalk.blue("blue")} ${chalk.green("green")} ${chalk.yellow("yellow")}`
  );
  console.log(
    `2. You receive one black key peg (${keyPegColorDisplayMap.BLACK}) for every peg in your attempt that matches both in color and position with the solution.`
  );
  console.log(
    `3. You receive one white key peg (${keyPegColorDisplayMap.WHITE}) for every peg in your attempt that matches in color with the solution, but not in position.`
  );
  console.log("\n");
  console.log(chalk.underline("VALID COLORS"));
  Object.entries(codePegColorDisplayMap).forEach(([key, value]) =>
    console.log(`${value}: ${key}`)
  );
  console.log("\n");
}
