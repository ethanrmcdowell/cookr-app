import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Data } from '@angular/router';
import { Recipe } from '../models';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  constructor(private dialogRef: MatDialogRef<EditRecipeComponent>, @Inject(MAT_DIALOG_DATA) private data: Data) {}

  ingredient: string = "";
  direction: string = "";
  selectedRecipe: any;

  ngOnInit() {
    this.selectedRecipe = this.data;
  }

  addIngredient() {

  }

  addDirection() {

  }

  saveRecipe() {
    console.log("RECIPE", this.selectedRecipe);
  }

  closeDialog() {
    console.log("INITIAL RECIPE", this.data);
    this.dialogRef.close({ success: false });
  }

  deleteFromArray(arrayChoice: string, index: number) {
    if (arrayChoice === 'ingredient') {
      this.selectedRecipe['ingredients'].splice(index, 1);
    } else {
      this.selectedRecipe['directions'].splice(index, 1);
    }
  }
}
