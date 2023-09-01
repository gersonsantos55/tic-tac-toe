import { Component } from '@angular/core';

type Space = {
  id: number;
  value: Symbol;
};

type Winner = {
  symbol: Symbol;
  sequence: number[];
} | undefined;

type Symbol = 'X' | 'O' | undefined;

const DEFAULT_SPACES: Space[] = [
  { id: 0, value: undefined },
  { id: 1, value: undefined },
  { id: 2, value: undefined },
  { id: 3, value: undefined },
  { id: 4, value: undefined },
  { id: 5, value: undefined },
  { id: 6, value: undefined },
  { id: 7, value: undefined },
  { id: 8, value: undefined },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private nextSymbol: Symbol = 'X';
  public spaces: Space[] = DEFAULT_SPACES;
  public winner: Winner;

  private updateNextSymbol(): void {
    this.nextSymbol = this.nextSymbol === 'X'
      ? 'O'
      : 'X';
  }

  public selectSpace(spaceId: number): void {
    if (!!this.winner) {
      return;
    }

    const spaceIndex = this.spaces.findIndex(obj => obj.id === spaceId);

    if (spaceIndex === -1) {
      return;
    }
    if (!!this.spaces[spaceIndex].value) {
      return;
    }

    this.spaces[spaceIndex].value = this.nextSymbol;

    this.checkForWinner();

    if (!this.winner) {
      this.updateNextSymbol();
    }
  }

  private checkForWinner(): void {
    if (!!this.winner) {
      return;
    }

    let winnerSequence: number[] = [];

    const checkSymbolsAreEquals = (ids: number[]): boolean => {
      let symbol: Symbol = undefined;
      for (const id of ids) {
        const value = this.spaces[id]?.value;
        if (!value) {
          return false;
        }
        if (!symbol) {
          symbol = value;
        }
        if (symbol !== value) {
          return false;
        }
      }
      winnerSequence = ids;
      return true;
    };

    if (
      checkSymbolsAreEquals([0, 1, 2])
      || checkSymbolsAreEquals([3, 4, 5])
      || checkSymbolsAreEquals([6, 7, 8])
      || checkSymbolsAreEquals([0, 4, 8])
      || checkSymbolsAreEquals([2, 4, 6])
    ) {
      this.winner = {
        sequence: winnerSequence,
        symbol: this.nextSymbol,
      };
    }
  }

  public isWinnerSquare(id: number): boolean {
    return !!this.winner?.sequence.includes(id);
  }


  public reset(): void {
    this.spaces = DEFAULT_SPACES;
    this.nextSymbol = 'X';
    delete this.winner;
  }

}
