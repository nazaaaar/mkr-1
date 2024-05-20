import { TestBed } from '@angular/core/testing';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let service: MatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateLowerHalfMean', () => {
    it('should calculate the mean of the lower half of the matrix', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      const mean = service.calculateLowerHalfMean(matrix);
      expect(mean).toBe(8);
    });

    it('should handle a single row matrix', () => {
      const matrix = [
        [1, 2, 3]
      ];
      const mean = service.calculateLowerHalfMean(matrix);
      expect(mean).toBe(0);
    });
  });

  describe('increaseUpperHalf', () => {
    it('should increase each element in the upper half of the matrix by a given value', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      const incrementValue = 5;
      const newMatrix = service.increaseUpperHalf(matrix, incrementValue);
      expect(newMatrix).toEqual([
        [6, 7, 8],
        [9, 10, 11],
        [7, 8, 9]
      ]);
    });

    it('should handle a single row matrix', () => {
      const matrix = [
        [1, 2, 3]
      ];
      const incrementValue = 5;
      const newMatrix = service.increaseUpperHalf(matrix, incrementValue);
      expect(newMatrix).toEqual([
        [6, 7, 8]
      ]);
    });
  });
});
