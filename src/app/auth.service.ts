import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();

  async loginUser(email: string, password: string, callback: (response: { success: boolean, message: string, id: string}) => void) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // console.log("userCredential", userCredential.user);
      callback({ success: true, message: userCredential.toString(), id: userCredential.user.uid });
    })
    .catch((error) => {
      callback({ success: false, message: error.code, id: 'NA' });
    });
  }

  async signupUser(email: string, password: string, callback: (response: { success: boolean, message: string, id: string}) => void) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      callback({ success: true, message: userCredential.toString(), id: userCredential.user.uid });
    })
    .catch((error) => {
      callback({ success: false, message: error.code, id: 'NA' });
    });
  }
}
