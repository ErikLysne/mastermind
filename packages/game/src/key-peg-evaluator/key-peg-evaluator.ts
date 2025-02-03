import { CodePegRow } from "../code-peg-row/code-peg-row.js";
import { CodePegColor } from "../constants/code-peg-color.js";
import { KeyPegColor } from "../constants/key-peg-color.js";

export class KeyPegEvaluator {
  private readonly solution: CodePegRow;
  private readonly codePegs: CodePegRow;

  constructor(solution: CodePegRow, codePegs: CodePegRow) {
    this.solution = solution;
    this.codePegs = codePegs;
  }

  public computeKeyPegs(): KeyPegColor[] {
    const keyPegs: KeyPegColor[] = [];
    const usedInSolution: boolean[] = new Array(4).fill(false);
    const usedInAttempt: boolean[] = new Array(4).fill(false);

    this.awardBlackPegs(this.solution, keyPegs, usedInSolution, usedInAttempt);
    this.awardWhitePegs(this.solution, keyPegs, usedInSolution, usedInAttempt);

    return keyPegs;
  }

  private awardBlackPegs(
    solution: CodePegRow,
    keyPegs: KeyPegColor[],
    usedInSolution: boolean[],
    usedInAttempt: boolean[]
  ): void {
    this.codePegs.getPegs().forEach((peg, index) => {
      if (solution.getByIndex(index) === peg) {
        keyPegs.push(KeyPegColor.BLACK);
        usedInSolution[index] = true;
        usedInAttempt[index] = true;
      }
    });
  }

  private awardWhitePegs(
    solution: CodePegRow,
    keyPegs: KeyPegColor[],
    usedInSolution: boolean[],
    usedInAttempt: boolean[]
  ): void {
    this.codePegs.getPegs().forEach((peg, attemptIndex) => {
      if (!usedInAttempt[attemptIndex]) {
        const solutionIndex = this.findUnusedMatchingPeg(
          solution,
          peg,
          usedInSolution
        );
        if (solutionIndex !== -1) {
          keyPegs.push(KeyPegColor.WHITE);
          usedInSolution[solutionIndex] = true;
        }
      }
    });
  }

  private findUnusedMatchingPeg(
    solution: CodePegRow,
    peg: CodePegColor,
    usedInSolution: boolean[]
  ): number {
    for (let i = 0; i < 4; i++) {
      if (!usedInSolution[i] && solution.getByIndex(i) === peg) {
        return i;
      }
    }
    return -1; // No valid match found
  }
}
