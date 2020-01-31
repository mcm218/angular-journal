import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-Settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  authenticated: boolean;

  signOut() {
    this.auth.signOut();
  }

  constructor(private auth: AuthenticationService) {
    // Subscribes to user to check if user is authenticated or not for displaying login/signup or user profile
    this.subscription = this.auth.user.subscribe(user => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }

      this.auth.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      });
    });
  }

  ngOnInit() {}
  subscription: Subscription;
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
