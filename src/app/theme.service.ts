import { Injectable } from "@angular/core";
import { Theme, themes } from "./styles/themes";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  theme: string;
  light: string;

  constructor(private cookieService: CookieService) {
    this.theme = this.cookieService.get("theme");
    this.light = this.cookieService.get("light");
    if (!this.theme) {
      this.theme = "black";
    }
    this.changeTheme(this.theme);
    this.changeLight(this.light);
  }

  getTheme(): string {
    return this.theme;
  }

  setTheme(theme: string) {
    this.theme = theme;
    this.cookieService.set("theme", theme);
  }

  setLight(light: string) {
    this.light = light;
    this.cookieService.set("light", light);
  }

  toggleLight() {
    if (this.theme === "black") {
      this.changeTheme("white");
    } else if (this.theme === "white") {
      this.changeTheme("black");
    } else if (this.light === "dark") {
      this.setLight("light");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("white").background
      );
    } else {
      this.setLight("dark");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("black").background
      );
    }
  }

  changeLight(light: string) {
    if (light === "light") {
      this.setLight("light");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("white").background
      );
    } else {
      this.setLight("dark");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("black").background
      );
    }
  }

  changeTheme(theme: string) {
    console.log("setting theme...");
    //TODO: Create Multiple Color Themes for Primary/Accent/Highlight/Text
    this.setTheme(theme);
    if (theme === "black") {
      this.setLight("dark");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("black").background
      );
    } else if (theme === "white") {
      this.setLight("light");
      document.documentElement.style.setProperty(
        "--background",
        themes.get("white").background
      );
    }
    document.documentElement.style.setProperty(
      "--primary",
      themes.get(theme).primary
    );
    document.documentElement.style.setProperty(
      "--accent",
      themes.get(theme).accent
    );
    document.documentElement.style.setProperty(
      "--highlight",
      themes.get(theme).highlight
    );
    document.documentElement.style.setProperty(
      "--text",
      themes.get(theme).text
    );
  }
}
