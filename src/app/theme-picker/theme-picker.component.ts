import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../theme.service";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { themes } from "../styles/themes";

@Component({
  selector: "app-theme-picker",
  templateUrl: "./theme-picker.component.html",
  styleUrls: ["./theme-picker.component.scss"]
})
export class ThemePickerComponent implements OnInit {
  themes = themes;
  faLightbulb = faLightbulb;
  selected: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.selected = this.themeService.getTheme();
  }

  toggleLight() {
    this.themeService.toggleLight();
    this.selected = this.themeService.getTheme();
  }

  changeTheme() {
    this.themeService.changeTheme(this.selected);
  }
}
