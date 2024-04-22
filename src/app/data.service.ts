import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Recipe } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) { }

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    const directoryArray: Recipe[] = [];
    const recipeRef = collection(this.firestore, 'recipes');
    const q = query(recipeRef, where('user', '==', userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data() as Recipe;
      data.id = doc.id;
      directoryArray.push(data);
    });

    return directoryArray;
  }

  async addRecipe(recipe: Recipe) {
    const collectionInstance: any = collection(this.firestore, 'recipes');
    await addDoc(collectionInstance, recipe).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }
}
