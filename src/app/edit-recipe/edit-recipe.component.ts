import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Data } from '@angular/router';
import { Recipe } from '../models';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  constructor(private snackBar: MatSnackBar, private dataService: DataService,private dialogRef: MatDialogRef<EditRecipeComponent>, @Inject(MAT_DIALOG_DATA) private data: Data) {}

  ingredient: string = "";
  direction: string = "";
  selectedRecipe: any = this.data;

  addIngredient() {
    this.selectedRecipe['ingredients'].push(this.ingredient);
    this.ingredient = "";
  }

  addDirection() {
    this.selectedRecipe['directions'].push(this.direction);
    this.direction = "";
  }

  async saveRecipe() {
    await this.dataService.editRecipe(this.selectedRecipe, this.selectedRecipe.id).then(() => {
      this.snackBarMessage('Recipe updated!');
      this.closeDialog();
    }).catch(error => {
      console.error(error);
      this.snackBarMessage('Error updating recipe!');
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteFromArray(arrayChoice: string, index: number) {
    if (arrayChoice === 'ingredient') {
      this.selectedRecipe['ingredients'].splice(index, 1);
    } else {
      this.selectedRecipe['directions'].splice(index, 1);
    }
  }

  snackBarMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
    });
  }
}
