import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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

  async getSingleRecipe(recipeId: string): Promise<Recipe> {
    const recipeRef = doc(this.firestore, 'recipes', recipeId);
    const querySnapshot = await getDoc(recipeRef);
    const singleRecipe: Recipe = querySnapshot.data() as Recipe;

    return singleRecipe;
  }

  async addRecipe(recipe: Recipe) {
    const collectionInstance = collection(this.firestore, 'recipes');
    await addDoc(collectionInstance, recipe).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }

  async editRecipe(recipe: Recipe, id: any) {
    const documentInstance: any = doc(this.firestore, 'recipes', id);
    await updateDoc(documentInstance, recipe).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }
}
