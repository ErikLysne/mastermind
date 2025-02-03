import { CodePegColor } from "../constants/code-peg-color";

export class CodePegRow {
  private readonly codePegs: [
    CodePegColor,
    CodePegColor,
    CodePegColor,
    CodePegColor
  ];

  constructor(
    codePegColor1: CodePegColor,
    codePegColor2: CodePegColor,
    codePegColor3: CodePegColor,
    codePegColor4: CodePegColor
  ) {
    this.codePegs = [
      codePegColor1,
      codePegColor2,
      codePegColor3,
      codePegColor4
    ];
  }

  public getPegs(): [CodePegColor, CodePegColor, CodePegColor, CodePegColor] {
    return this.codePegs;
  }

  public getByIndex(index: number): CodePegColor {
    return this.codePegs[index];
  }
}
