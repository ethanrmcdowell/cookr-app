import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-display',
  standalone: true,
  imports: [],
  templateUrl: './recipe-display.component.html',
  styleUrl: './recipe-display.component.css'
})
export class RecipeDisplayComponent {
  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  recipeId: any = this.route.snapshot.paramMap.get('id');
  recipeData: any;

  ngOnInit() {
    console.log("recipeId", this.recipeId);
    this.dataService.getSingleRecipe(this.recipeId).then((result) => {
      console.log("recipe", result);
      this.recipeData = result;
    });
  }
}
