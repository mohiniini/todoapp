import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule , ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { ViewnotesComponent } from './viewnotes/viewnotes.component';
import { AddnotesComponent } from './addnotes/addnotes.component';
import { BioserviceService} from '../app/bioservice.service'
import { UpdatedeletenotesComponent } from './updatedeletenotes/updatedeletenotes.component';
import { WritenoteComponent } from './writenote/writenote.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptors } from "./auth-interceptors";
import { LoginComponent } from './auth/login/login.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,MatFormFieldModule
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ViewnotesComponent,
    AddnotesComponent,
    UpdatedeletenotesComponent,
    WritenoteComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ BioserviceService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
