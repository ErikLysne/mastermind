import { confirm, input } from "@inquirer/prompts";
import {
  CodePegColor,
  CodePegRow,
  GameState,
  Mastermind
} from "@mastermind/game";
import chalk from "chalk";
import { codePegColorDisplayMap } from "./code-peg-color-display-map";
import { generateRandomCodePegColor } from "./generate-random-code-peg-color";
import { keyPegColorDisplayMap } from "./key-peg-color-display-map";
import { printInstructions } from "./print-instructions";

function getFormattedInputValues(rawInputValue: string): string[] {
  return rawInputValue.split(" ").map((value) => value.toUpperCase());
}

async function playMastermind(): Promise<void> {
  console.log("Creating game...");
  console.log("\n");

  const mastermind = new Mastermind(
    new CodePegRow(
      generateRandomCodePegColor(),
      generateRandomCodePegColor(),
      generateRandomCodePegColor(),
      generateRandomCodePegColor()
    )
  );

  while (mastermind.getGameState() === GameState.IN_PROGRESS) {
    let rawInputValue: string;

    try {
      rawInputValue = await input({
        message: "Enter solution",
        validate: (value) => {
          const values = getFormattedInputValues(value);

          if (values.length !== 4) {
            return false;
          }

          return values.every((value) =>
            Object.values(CodePegColor).includes(value as CodePegColor)
          );
        }
      });
    } catch {
      console.log(chalk.bold.red("Game ended"));
      return;
    }

    const values = getFormattedInputValues(rawInputValue) as [
      CodePegColor,
      CodePegColor,
      CodePegColor,
      CodePegColor
    ];

    const attempt = mastermind.makeAttempt(...values);
    const keyPegs = attempt.getKeyPegs();

    const formattedAttempt = values
      .map((value) => codePegColorDisplayMap[value])
      .join(" ");

    const formattedResult = Array.from({ length: 4 })
      .map((_, index) => keyPegs[index])
      .map((value) => (value ? keyPegColorDisplayMap[value] : "・"))
      .join(" ");

    console.log(
      `${mastermind.getAttemptCount()}. `,
      "Your attempt: ",
      formattedAttempt,
      " | ",
      "Result: ",
      formattedResult,
      "\n"
    );
  }

  if (mastermind.getGameState() === GameState.FAILED_TO_SOLVE) {
    console.log(chalk.bold.red("Game over"));
    console.log(
      `The solution was: ${mastermind
        .getSolution()
        .getPegs()
        .map((value) => codePegColorDisplayMap[value])
        .join(" ")}`
    );
  }

  if (mastermind.getGameState() === GameState.SOLVED) {
    console.log(
      chalk.bold.green(
        `Congratulations! You solved the game in ${mastermind.getAttemptCount()} attempts!`
      )
    );
  }

  try {
    const playAgain = await confirm({ message: "Do you want to play again?" });

    if (playAgain) {
      playMastermind();
    } else {
      console.log(chalk.bold.blue("Thanks for playing!"));
      return;
    }
  } catch {
    return;
  }
}

printInstructions();
playMastermind();
