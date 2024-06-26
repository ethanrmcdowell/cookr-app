import { Injectable } from '@angular/core';
import { getAuth, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();
  authUser: any = {};

  // set up observables for authenticated status and user data
  private userAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(this.authUser);
  userAuthenticated$ = this.userAuthenticatedSubject.asObservable();
  userData$ = this.userSubject.asObservable();

  checkUserAuthStatus() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userAuthenticatedSubject.next(true);
        this.userSubject.next(user);
      }
    });
  }

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

  async signupUser(email: string, password: string, displayName: string, callback: (response: { success: boolean, message: string, id: string}) => void) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then(async (userCredential) => {
      await this.updateDisplayName(userCredential, displayName)
      .then(() => {
        callback({ success: true, message: userCredential.toString(), id: userCredential.user.uid });
      });
    })
    .catch((error) => {
      callback({ success: false, message: error.code, id: 'NA' });
    });
  }

  async updateDisplayName(userCredential: any, displayName: string) {
    return updateProfile(userCredential.user, {
      displayName: displayName,
    }).catch(error => {
      console.error(error);
    })
  }

  async logoutUser(callback: (response: { success: boolean, message?: string }) => void) {
    signOut(this.auth)
    .then(() => {
      this.userAuthenticatedSubject.next(false);
      callback({success: true});
    })
    .catch((error) => {
      this.userAuthenticatedSubject.next(true);
      callback({success: false, message: error});
    })
  }

  async passwordReset(email: string, callback: (response: { success: boolean, message?: string }) => void) {
    sendPasswordResetEmail(this.auth, email)
    .then(() => {
      callback({success: true});
    })
    .catch((error) => {
      callback({success: false, message: error})
    })
  }
}
