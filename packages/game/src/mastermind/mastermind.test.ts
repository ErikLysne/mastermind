import { CodePegRow } from "../code-peg-row/code-peg-row.js";
import { CodePegColor } from "../constants/code-peg-color.js";
import { GameState } from "../constants/game-state.js";
import { Mastermind } from "./mastermind.js";

describe("Mastermind", () => {
  describe("makeAttempt", () => {
    it("should return GameState.FAILED_TO_SOLVE if the maximum number of attempts has been made", () => {
      const mastermind = new Mastermind(
        new CodePegRow(
          CodePegColor.BLACK,
          CodePegColor.BLUE,
          CodePegColor.GREEN,
          CodePegColor.RED
        )
      );

      for (let i = 0; i < 10; i++) {
        mastermind.makeAttempt(
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW
        );
      }

      expect(mastermind.getGameState()).toBe(GameState.FAILED_TO_SOLVE);
    });

    it("should return GameState.SOLVED if the correct solution is guessed", () => {
      const mastermind = new Mastermind(
        new CodePegRow(
          CodePegColor.BLACK,
          CodePegColor.BLUE,
          CodePegColor.GREEN,
          CodePegColor.RED
        )
      );

      mastermind.makeAttempt(
        CodePegColor.BLACK,
        CodePegColor.BLUE,
        CodePegColor.GREEN,
        CodePegColor.RED
      );

      expect(mastermind.getGameState()).toBe(GameState.SOLVED);
    });

    it("should return GameState.IN_PROGRESS if the game is still in progress", () => {
      const mastermind = new Mastermind(
        new CodePegRow(
          CodePegColor.BLACK,
          CodePegColor.BLUE,
          CodePegColor.GREEN,
          CodePegColor.RED
        )
      );

      mastermind.makeAttempt(
        CodePegColor.YELLOW,
        CodePegColor.YELLOW,
        CodePegColor.YELLOW,
        CodePegColor.YELLOW
      );

      expect(mastermind.getGameState()).toBe(GameState.IN_PROGRESS);
    });

    it("should throw an error if an attempt is made after the game has ended", () => {
      const mastermind = new Mastermind(
        new CodePegRow(
          CodePegColor.BLACK,
          CodePegColor.BLUE,
          CodePegColor.GREEN,
          CodePegColor.RED
        )
      );

      for (let i = 0; i < 10; i++) {
        mastermind.makeAttempt(
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW
        );
      }

      expect(() =>
        mastermind.makeAttempt(
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW,
          CodePegColor.YELLOW
        )
      ).toThrowErrorMatchingInlineSnapshot(
        `[Error: Cannot make any futher attempts after game has ended]`
      );
    });
  });
});
