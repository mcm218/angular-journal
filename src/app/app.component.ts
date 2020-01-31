import { Component, OnInit } from "@angular/core";
import { EditorChangeContent, EditorChangeSelection } from "ngx-quill";
import { FormGroup } from "@angular/forms";
import { ThemeService } from "./theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "journal-app";

  constructor(private themeService: ThemeService) {}
  ngOnInit() {}
}
