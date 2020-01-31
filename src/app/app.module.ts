import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
import { FooterComponent } from "./footer/footer.component";
import { EntriesComponent } from "./entries/entries.component";
import { HomeComponent } from "./home/home.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { HeaderComponent } from "./header/header.component";
import { environment } from "src/environments/environment";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EntryEditorComponent } from "./entry-editor/entry-editor.component";
import { SettingsComponent } from "./settings/settings.component";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    EntriesComponent,
    HomeComponent,
    HeaderComponent,
    EntryEditorComponent,
    SettingsComponent,
    ThemePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
