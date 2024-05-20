import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent implements OnInit {
  matrixForm!: FormGroup;
  @Output() matrixArrayChange = new EventEmitter<{ matrix: number[][], incrementValue: number }>();
  constructor(private fb: FormBuilder) {
    // Initialize the form with default values (3 rows and 4 columns)
    this.matrixForm = this.fb.group({
      numRows: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      numCols: [4, [Validators.required, Validators.min(1), Validators.max(10)]],
      isRandom: [false],
      incrementValue: [0, Validators.required],
      cellForms: this.fb.array([]),
    });

    // Create the initial grid
    this.createMatrix();
  }

  // Create the matrix based on user input
  createMatrix() {
    const numRowsControl = this.matrixForm.get('numRows');
    const numColsControl = this.matrixForm.get('numCols');

    if (numRowsControl && numColsControl) {
      const numRows: number = numRowsControl.value;
      const numCols: number = numColsControl.value;

      const cellFormsArray = this.matrixForm.get('cellForms') as FormArray;
      cellFormsArray.clear(); // Clear existing forms

      for (let i = 0; i < numRows; i++) {
        const row: FormGroup[] = [];
        for (let j = 0; j < numCols; j++) {
          const cellForm = this.fb.group({
            value: [0, Validators.required],
          });
          row.push(cellForm);
        }
        cellFormsArray.push(this.fb.array(row));
      }
    }
  }

  ngOnInit(): void {
    // Leave this method empty if not implementing anything specific
  }

  getControlsMatrix(): AbstractControl[] {
    const form = this.matrixForm.get('cellForms') as FormArray;
    return form.controls;
  }

  getRowControls(row: AbstractControl): AbstractControl[] {
    const formArray = row as FormArray;
    return formArray.controls;
  }

  // Listen to changes on numRows and numCols
  onRowColCountChange() {
    this.matrixForm.get('numRows')?.valueChanges.subscribe(() => {
      const numRowsControl = this.matrixForm.get('numRows');
      const numColsControl = this.matrixForm.get('numCols');

      if (numRowsControl && numColsControl && numRowsControl.valid && numColsControl.valid) {
        this.createMatrix();
        this.matrixForm.get('isRandom')?.setValue(false);
      }
    });
    this.matrixForm.get('numCols')?.valueChanges.subscribe(() => {
      const numRowsControl = this.matrixForm.get('numRows');
      const numColsControl = this.matrixForm.get('numCols');

      if (numRowsControl && numColsControl && numRowsControl.valid && numColsControl.valid) {
        this.createMatrix();
        this.matrixForm.get('isRandom')?.setValue(false);
      }
    });
  }

  protected readonly FormGroup = FormGroup;
  onRandomCheckboxChange(event: any) {
    if (event.detail.checked) {
      this.fillWithRandomNumbers();
    }
    else this.fillWithZeros();
  }


  fillWithRandomNumbers() {
    const formArray = this.matrixForm.get('cellForms') as FormArray;
    formArray.controls.forEach((row: AbstractControl) => { // Fix the type here
      (row as FormArray).controls.forEach((cell: AbstractControl) => { // Fix the type here
        (cell.get('value') as AbstractControl).setValue(Math.floor(Math.random() * 100)); // Random number between 0 and 99
      });
    });
  }

  fillWithZeros() {
    const formArray = this.matrixForm.get('cellForms') as FormArray;
    formArray.controls.forEach((row: AbstractControl) => { // Fix the type here
      (row as FormArray).controls.forEach((cell: AbstractControl) => { // Fix the type here
        (cell.get('value') as AbstractControl).setValue(0);
      });
    });
  }

  emitMatrixArray() {
    const formArray = this.matrixForm.get('cellForms') as FormArray;
    const matrixArray = formArray.controls.map((row: AbstractControl) =>
      (row as FormArray).controls.map((cell: AbstractControl) => (cell.get('value') as AbstractControl).value)
    );
    const incrementValue = this.matrixForm.get('incrementValue')?.value || 0;
    this.matrixArrayChange.emit({ matrix: matrixArray, incrementValue });
  }

  onSubmit() {
    this.emitMatrixArray();
  }
}
