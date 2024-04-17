import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  userId: any;
  recipes: Recipe[] = [];

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }


  async getRecipes() {
    this.recipes = [];
    this.recipes = await this.dataService.getUserRecipes(this.userId);

    console.log("recipes", this.recipes);
  }
}
