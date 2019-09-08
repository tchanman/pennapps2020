import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ResultPageComponent } from './result-page/result-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'questions/:id/:lat/:long', component: QuestionPageComponent },
  { path: 'result/:restaurantid', component: ResultPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

