import { CodePegRow } from "../code-peg-row/code-peg-row";
import { KeyPegColor } from "../constants/key-peg-color";
import { KeyPegEvaluator } from "../key-peg-evaluator/key-peg-evaluator";

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
