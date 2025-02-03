import { CodePegRow } from "../code-peg-row/code-peg-row.js";
import { CodePegColor } from "../constants/code-peg-color.js";
import { KeyPegColor } from "../constants/key-peg-color.js";
import { KeyPegEvaluator } from "./key-peg-evaluator.js";

describe("KeyPegEvaluator", () => {
  describe("computeKeyPegs", () => {
    it("should award 4 black pegs if all code pegs are correct", () => {
      const solution = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED
      );
      const codePegs = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED
      );

      const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

      expect(keyPegs).toEqual([
        KeyPegColor.BLACK,
        KeyPegColor.BLACK,
        KeyPegColor.BLACK,
        KeyPegColor.BLACK
      ]);
    });
  });

  it("should award no pegs if no code pegs are correct", () => {
    const solution = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.RED,
      CodePegColor.RED,
      CodePegColor.RED
    );
    const codePegs = new CodePegRow(
      CodePegColor.BLUE,
      CodePegColor.BLUE,
      CodePegColor.BLUE,
      CodePegColor.BLUE
    );

    const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

    expect(keyPegs).toEqual([]);
  });

  it("should award 4 white pegs if all code pegs are correct but in the wrong position", () => {
    const solution = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.BLUE,
      CodePegColor.YELLOW
    );
    const codePegs = new CodePegRow(
      CodePegColor.YELLOW,
      CodePegColor.BLUE,
      CodePegColor.GREEN,
      CodePegColor.RED
    );

    const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

    expect(keyPegs).toEqual([
      KeyPegColor.WHITE,
      KeyPegColor.WHITE,
      KeyPegColor.WHITE,
      KeyPegColor.WHITE
    ]);
  });

  it("should award 2 black pegs and 2 white pegs if 2 code pegs are correct and in the right position and 2 code pegs are correct but in the wrong position", () => {
    const solution = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.BLUE,
      CodePegColor.YELLOW
    );
    const codePegs = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.YELLOW,
      CodePegColor.BLUE
    );

    const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

    expect(keyPegs).toEqual([
      KeyPegColor.BLACK,
      KeyPegColor.BLACK,
      KeyPegColor.WHITE,
      KeyPegColor.WHITE
    ]);
  });

  it("should award the correct number of black and white pegs if there are duplicates in the code pegs", () => {
    const solution = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.BLUE,
      CodePegColor.YELLOW
    );
    const codePegs = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.GREEN
    );

    const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

    expect(keyPegs).toEqual([KeyPegColor.BLACK, KeyPegColor.WHITE]);
  });

  it("should award the correct number of black and white pegs if there are duplicates in the solution", () => {
    const solution = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.GREEN
    );
    const codePegs = new CodePegRow(
      CodePegColor.RED,
      CodePegColor.GREEN,
      CodePegColor.RED,
      CodePegColor.GREEN
    );

    const keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();

    expect(keyPegs).toEqual([
      KeyPegColor.BLACK,
      KeyPegColor.BLACK,
      KeyPegColor.WHITE,
      KeyPegColor.WHITE
    ]);
  });
});
