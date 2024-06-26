import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatGridListModule, MatCardModule, MatSidenavModule, MatIconModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private snackBar: MatSnackBar, private clipboard: Clipboard, private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private authService: AuthService) {
    this.authService.userData$.subscribe(userData => {
      this.user = userData;
      if (this.userId === this.user.uid) this.userAdmin = true;
    })
  }

  userId: any = this.route.snapshot.paramMap.get('id');
  user: any;
  userAdmin: boolean = false;
  recipes: Recipe[] = [];
  showSidenav: boolean = true;
  selectedRecipe: any;

  ngOnInit() {
    this.getRecipes();

    console.log("width", window.screen.width);
  }


  async getRecipes() {
    this.recipes = [];
    this.recipes = await this.dataService.getUserRecipes(this.userId);

    console.log("recipes", this.recipes);
    if (this.recipes.length > 0) this.selectedRecipe = this.recipes[0];
  }

  addRecipe() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: window.screen.width < 960 ? '90%' : '60%',
      height: '75%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.getRecipes();
      }
    })
  }
  
  editRecipe() {
    const editData = Object.assign({}, this.selectedRecipe);
    const dialogRef = this.dialog.open(EditRecipeComponent, {
      width: window.screen.width < 960 ? '90%' : '60%',
      height: '75%',
      disableClose: true,
      data: editData,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRecipes();
    })
  }

  selectRecipe(recipe: any) {
    this.selectedRecipe = recipe;
    if (window.screen.width < 960) {
      this.sidenavToggle();
    }
  }

  sidenavToggle() {
    this.showSidenav = !this.showSidenav;
  }

  shareRecipe() {
    let recipeUrl;
    if (window.location.hostname === 'localhost') {
      recipeUrl = "localhost:4200/recipe/" + this.selectedRecipe.id;
    } else {
      recipeUrl = "https://cookr-app.web.app/recipe/" + this.selectedRecipe.id;
    }
    this.clipboard.copy(recipeUrl);
    this.snackBar.open("Recipe address copied to clipboard!", "Close", {
      duration: 6000,
    })
  }
}
