import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from '../services/register.service'
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [

  { path: "", component: HomeMenuComponent },
  { path: "register", component: RegisterComponent },
  { path: "thankyou", component: ThankYouComponent },

  { path: "404", component: HomeMenuComponent },
  { path: "**", component: HomeMenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeMenuComponent,
    ThankYouComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],

  providers: [RegisterService, { provide: LocationStrategy, useClass: HashLocationStrategy }],

  bootstrap: [AppComponent]
})
export class AppModule { }
