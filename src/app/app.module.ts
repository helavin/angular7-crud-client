import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms'; // +
import { HttpClientModule } from '@angular/common/http'; // +

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { GenericCRUD_Service } from './genericCRUD.service';

// Angular Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactsComponent } from './contacts/contacts.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ContactsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GenericCRUD_Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
