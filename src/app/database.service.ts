import { Injectable } from "@angular/core";
import { AuthenticationService, User } from "./authentication.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";

export interface Entry {
  dateCreated: string;
  uid: string;
  body: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  user: User;
  constructor(
    private auth: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  addEntry(value): Promise<any> {
    console.log("database.service", "addEntry");
    return this.firestore
      .collection("users/" + this.user.uid + "/entries")
      .add({ dateCreated: Date.now(), body: value });
  }

  getEntries(next?): Observable<any> {
    console.log("database.service", "getEntries");
    if(!this.user){
      return of([]);
    }
    if (next) {
      return this.firestore
        .collection("users/" + this.user.uid + "/entries", ref =>
          ref
            .orderBy("dateCreated", "desc")
            .startAfter(next)
            .limit(10)
        )
        .snapshotChanges();
    }
    return this.firestore
      .collection("users/" + this.user.uid + "/entries", ref =>
        ref.orderBy("dateCreated", "desc").limit(10)
      )
      .snapshotChanges();
  }

  getEntry(id): Observable<any> {
    console.log("database.service", "getEntry");
    return this.firestore
      .collection("users/" + this.user.uid + "/entries")
      .doc(id)
      .get();
  }

  updateEntry(id, value): Promise<any> {
    console.log("database.service", "updateEntry");
    return this.firestore
      .collection("users/" + this.user.uid + "/entries")
      .doc(id)
      .update({ body: value });
  }

  deleteEntry(id): Promise<any> {
    console.log("database.service", "deleteEntry");
    return this.firestore
      .collection("users/" + this.user.uid + "/entries")
      .doc(id)
      .delete();
  }
}
