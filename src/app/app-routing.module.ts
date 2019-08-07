import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ArticleComponent } from './article/article.component';



const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'articles', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
