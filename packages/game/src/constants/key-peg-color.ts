export const KeyPegColor = {
  WHITE: "WHITE",
  BLACK: "BLACK",
} as const;

export type KeyPegColor = (typeof KeyPegColor)[keyof typeof KeyPegColor];
