import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();

  async loginUser(email: string, password: string, callback: (response: { success: boolean, message: string}) => void) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      console.log("userCredential", userCredential);
      callback({ success: true, message: userCredential.toString() });
    })
    .catch((error) => {
      callback({ success: false, message: error.code });
    });
  }
}
