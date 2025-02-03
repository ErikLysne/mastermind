import { Attempt } from "../attempt/attempt";
import { CodePegRow } from "../code-peg-row/code-peg-row";
import { CodePegColor } from "../constants/code-peg-color";
import { GameState } from "../constants/game-state";

export class Mastermind {
  private readonly solution: CodePegRow;
  private readonly attempts: Attempt[] = [];
  private readonly numberOfAttempts = 10;
  private gameState: GameState = GameState.IN_PROGRESS;

  constructor(solution: CodePegRow) {
    this.solution = solution;
  }

  public makeAttempt(
    codePegColor1: CodePegColor,
    codePegColor2: CodePegColor,
    codePegColor3: CodePegColor,
    codePegColor4: CodePegColor
  ): Attempt {
    if (this.gameState !== GameState.IN_PROGRESS) {
      throw new Error("Cannot make any futher attempts after game has ended");
    }

    const attempt = new Attempt(
      new CodePegRow(
        codePegColor1,
        codePegColor2,
        codePegColor3,
        codePegColor4
      ),
      this.solution
    );

    this.attempts.push(attempt);

    if (attempt.getResult()) {
      this.gameState = GameState.SOLVED;
    }

    if (
      this.attempts.length === this.numberOfAttempts &&
      this.gameState !== GameState.SOLVED
    ) {
      this.gameState = GameState.FAILED_TO_SOLVE;
    }

    return attempt;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public getAttemptCount(): number {
    return this.attempts.length;
  }

  public getAttemps(): Attempt[] {
    return this.attempts;
  }

  public getSolution(): CodePegRow {
    return this.solution;
  }
}
