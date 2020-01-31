import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm;
  signupForm;
  faGoogle = faGoogle;
  errorMessage;
  loginMode = true;
  toggleText = "Need to create account?";

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: ""
    });
    this.signupForm = this.formBuilder.group({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  }

  ngOnInit() {}

  trySignup(value) {
    if (value.password !== value.confirmPassword) {
      this.errorMessage = "Sorry, your passwords don't match";
    }
    this.auth
      .emailSignup({
        displayName: value.displayName,
        email: value.email,
        password: value.password
      })
      .then(
        () => {
          this.errorMessage = "";
        },
        err => {
          this.errorMessage = err.message;
        }
      );
  }

  tryLogin(value) {
    this.auth.emailLogin(value).then(
      () => {
        this.errorMessage = "";
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }

  toggleLoginOrSignup() {
    this.loginMode = !this.loginMode;
    if (this.loginMode) {
      this.toggleText = "Need to create account?";
    } else {
      this.toggleText = "Already have an account?";
    }
  }
  googleSignIn() {
    this.auth.googleLogin();
  }
}
