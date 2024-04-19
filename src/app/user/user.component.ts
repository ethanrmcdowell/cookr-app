import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatGridListModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog) {}

  userId: any;
  recipes: Recipe[] = [];

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getRecipes();
  }


  async getRecipes() {
    this.recipes = [];
    this.recipes = await this.dataService.getUserRecipes(this.userId);

    console.log("recipes", this.recipes);
  }

  addRecipe() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '60%',
      height: '75%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed.");
      this.getRecipes();
    })
  }
}
