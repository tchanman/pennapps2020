import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
// import {Container} from '@material-ui/Core/Container';
import { HomepageComponent } from './homepage/homepage.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ResultPageComponent } from './result-page/result-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    QuestionPageComponent,
    ResultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule
    // Container
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
