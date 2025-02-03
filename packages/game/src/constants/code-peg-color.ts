export const CodePegColor = {
  RED: "RED",
  BLUE: "BLUE",
  YELLOW: "YELLOW",
  GREEN: "GREEN",
  WHITE: "WHITE",
  BLACK: "BLACK",
} as const;

export type CodePegColor = (typeof CodePegColor)[keyof typeof CodePegColor];
