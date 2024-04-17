import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
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
}
