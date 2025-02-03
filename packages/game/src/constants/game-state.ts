export const GameState = {
  IN_PROGRESS: "IN_PROGRESS",
  SOLVED: "SOLVED",
  FAILED_TO_SOLVE: "FAILED_TO_SOLVE",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];
