import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { Subscription } from "rxjs";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  faCog = faCog;
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
