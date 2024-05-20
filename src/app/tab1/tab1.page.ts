import { Component } from '@angular/core';
import {MatrixService} from "../matrix.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  matrixArray: number[][] = [];
  lowerHalfMean: number | null = null;
  increasedMatrix: number[][] = [];

  constructor(private matrixService: MatrixService) {}

  onMatrixArrayChange(event: { matrix: number[][], incrementValue: number }) {
    this.matrixArray = event.matrix;
    console.log(this.matrixArray);
    const incrementValue = event.incrementValue;
    this.calculateLowerHalfMean();
    this.increaseUpperHalf(incrementValue);
  }

  calculateLowerHalfMean() {
    this.lowerHalfMean = this.matrixService.calculateLowerHalfMean(this.matrixArray);
  }

  increaseUpperHalf(incrementValue:number) {
    this.increasedMatrix = this.matrixService.increaseUpperHalf(this.matrixArray, incrementValue);
  }
}
