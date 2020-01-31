import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { resolve } from "url";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  user: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  emailSignup(value): any {
    // Attempts to create user with provided email/password
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            value.uid = res.user.uid;
            this.updateUserData(value);
            console.log("Signed up");
            resolve(res);
            this.router.navigate(["/"]);
          },
          err => reject(err)
        );
    });
  }

  emailLogin(value): any {
    // Attempts to login user with provided email/password
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            value.uid = res.user.uid;
            value.displayName = res.user.displayName;
            console.log("Logged in");
            this.updateUserData(value);
            resolve(res);
            this.router.navigate(["/"]);
          },
          err => reject(err)
        );
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
      this.router.navigate(["/"]);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
