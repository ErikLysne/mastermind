import { CodePegRow } from "../code-peg-row/code-peg-row.js";
import { CodePegColor } from "../constants/code-peg-color.js";
import { Attempt } from "./attempt.js";

describe("Attempt", () => {
  describe("getResult", () => {
    it("should return true the solution is correct", () => {
      const codePegs = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED
      );
      const solution = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED
      );
      const attempt = new Attempt(codePegs, solution);

      const result = attempt.getResult();

      expect(result).toBe(true);
    });

    it("should return false if the solution is incorrect", () => {
      const codePegs = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED
      );
      const solution = new CodePegRow(
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.RED,
        CodePegColor.BLUE
      );
      const attempt = new Attempt(codePegs, solution);

      const result = attempt.getResult();

      expect(result).toBe(false);
    });
  });
});
