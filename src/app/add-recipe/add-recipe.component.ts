import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Recipe } from '../models';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  constructor(private dataService: DataService, private authService: AuthService, private dialogRef: MatDialogRef<AddRecipeComponent>) {
    this.authService.userData$.subscribe(userData => {
      this.userId = userData.uid;
    });
  }
  
  userId: any;
  ingredients: string[] = [];
  ingredient: string = "";
  directions: string[] = [];
  direction: string = "";
  name: string = "";

  ngOnInit() {
    console.log("dialog - user:", this.userId);
  }

  addIngredient() {
    this.ingredients.push(this.ingredient);
    this.ingredient = "";
  }

  addDirection() {
    this.directions.push(this.direction);
    this.direction = "";
  }

  async addRecipe() {
    const newRecipe: Recipe = {
      directions: this.directions,
      ingredients: this.ingredients,
      name: this.name,
      user: this.userId,
    }

    this.dataService.addRecipe(newRecipe).then(() => {
      console.log("Success?");
      this.dialogRef.close({ success: true });
    }).catch(error => {
      console.error(error);
      this.dialogRef.close({ success: false, message: error });
    });
  }

  closeDialog() {
    this.dialogRef.close({ success: false });
  }

  deleteFromArray(arrayChoice: string, index: number) {
    if (arrayChoice === 'ingredient') {
      this.ingredients.splice(index, 1);
    } else {
      this.directions.splice(index, 1);
    }
  }
}
