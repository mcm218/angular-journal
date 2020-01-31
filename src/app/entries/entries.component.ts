import { Component, OnInit } from "@angular/core";
import { DatabaseService, Entry } from "../database.service";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../authentication.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-entries",
  templateUrl: "./entries.component.html",
  styleUrls: ["./entries.component.scss"]
})
export class EntriesComponent implements OnInit {
  entries: Entry[] = [];
  foundAllEntries: boolean = false;
  authenticated: boolean;
  next: any;

  constructor(
    private auth: AuthenticationService,
    private db: DatabaseService
  ) {
    // Subscribes to user to determine whether to show comment form
  }

  ngOnInit() {
    this.authSub = this.auth.user.subscribe(user => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      this.auth.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.authenticated = true;
          this.getEntries();
        } else {
          this.authenticated = false;
        }
      });
    });
  }

  getEntries(next?): void {
    if (next) {
      this.dbSub = this.db.getEntries(next).subscribe(entries => {
        // console.log(
        //   "entries.component",
        //   "getEntries(next)-" + entries.length
        // );
        if (entries.length == 0) {
          this.foundAllEntries = true;
          return;
        }
        if (entries.length < 10) {
          this.foundAllEntries = true;
        }
        for (let entry of entries) {
          this.entries.push({
            dateCreated: entry.payload.doc.data().dateCreated,
            uid: entry.payload.doc.uid,
            body: entry.payload.doc.data().body
          });
        }
        this.next = entries[entries.length - 1].payload.doc;
      });
      return;
    }
    this.dbSub = this.db.getEntries().subscribe(entries => {
      this.entries = [];
      this.foundAllEntries = false;
      // console.log(
      //   "entries.component",
      //   "getEntries-" + entries.length
      // );
      if (entries.length == 0) {
        this.foundAllEntries = true;
        return;
      }
      if (entries.length < 10) {
        this.foundAllEntries = true;
      }
      let i = 0;
      for (let entry of entries) {
        this.entries.push({
          dateCreated: entry.payload.doc.data().dateCreated,
          uid: entry.payload.doc.id,
          body: entry.payload.doc.data().body
        });
        i++;
      }
      this.next = entries[entries.length - 1].payload.doc;
    });
  }

  onScroll() {
    if (!this.foundAllEntries) {
      this.getEntries(this.next);
    }
  }

  dbSub: Subscription;
  authSub: Subscription;
  ngOnDestroy() {
    this.dbSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
