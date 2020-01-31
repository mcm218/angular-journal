import { Component, OnInit } from "@angular/core";
import { DatabaseService, Entry } from "../database.service";
import { AuthenticationService } from "../authentication.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-entry-editor",
  templateUrl: "./entry-editor.component.html",
  styleUrls: ["./entry-editor.component.scss"]
})
export class EntryEditorComponent implements OnInit {
  path: string;
  quill: any;

  created(event) {}

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Uses URL path to determine database comments location
    this.route.url.subscribe(url => {
      if (url[0]) {
        this.path = url[0].path;
        this.readEntry();
      }
    });
  }

  ngOnInit() {}

  addEntry(): void {
    this.db.addEntry(this.quill).then(() => {
      this.quill = null;
    });
  }

  readEntry(): void {
    this.db.getEntry(this.path).subscribe(entry => {
      this.quill = entry.data().body;
    });
  }

  updateEntry(): void {
    this.db.updateEntry(this.path, this.quill).then(() => {
      this.router.navigate(["/"]);
    });
  }

  deleteEntry(): void {
    this.db.deleteEntry(this.path).then(() => {
      this.router.navigate(["/"]);
    });
  }

  ngOnDestroy() {}
}
