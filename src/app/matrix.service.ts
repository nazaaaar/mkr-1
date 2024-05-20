import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  calculateLowerHalfMean(matrix: number[][]): number {
    const numRows = matrix.length;
    const halfIndex = Math.ceil(numRows / 2);
    let sum = 0;
    let count = 0;

    for (let i = halfIndex; i < numRows; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j];
        count++;
      }
    }

    return count === 0 ? 0 : sum / count;
  }

  increaseUpperHalf(matrix: number[][], t: number): number[][] {
    const numRows = matrix.length;
    const halfIndex = Math.floor(numRows / 2);

    return matrix.map((row, rowIndex) => {
      if (rowIndex <= halfIndex) {
        return row.map(value => value + t);
      } else {
        return row.slice();
      }
    });
  }
}
