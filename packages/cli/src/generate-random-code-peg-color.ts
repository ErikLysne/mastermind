import { CodePegColor } from "@mastermind/game";

export function generateRandomCodePegColor(): CodePegColor {
  const colors = Object.values(CodePegColor);
  const index = Math.floor(Math.random() * colors.length);

  return CodePegColor[colors[index]];
}
