import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  constructor(private dataService: DataService) {}
  
  ingredients: string[] = [];
  ingredient: string = "";
  directions: string[] = [];
  direction: string = "";

  addIngredient() {
    this.ingredients.push(this.ingredient);
    this.ingredient = "";
  }

  addDirection() {
    this.directions.push(this.direction);
    this.direction = "";
  }
}
