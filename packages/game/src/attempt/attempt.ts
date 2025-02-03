import { CodePegRow } from "../code-peg-row/code-peg-row.js";
import { KeyPegColor } from "../constants/key-peg-color.js";
import { KeyPegEvaluator } from "../key-peg-evaluator/key-peg-evaluator.js";

export class Attempt {
  private readonly keyPegs: KeyPegColor[] = [];
  private readonly result: boolean;

  constructor(codePegs: CodePegRow, solution: CodePegRow) {
    this.keyPegs = new KeyPegEvaluator(solution, codePegs).computeKeyPegs();
    this.result = this.computeResult();
  }

  public getResult(): boolean {
    return this.result;
  }

  public getKeyPegs(): KeyPegColor[] {
    return this.keyPegs;
  }

  private computeResult(): boolean {
    return (
      this.keyPegs.length === 4 &&
      this.keyPegs.every((keyPeg) => keyPeg === KeyPegColor.BLACK)
    );
  }
}
