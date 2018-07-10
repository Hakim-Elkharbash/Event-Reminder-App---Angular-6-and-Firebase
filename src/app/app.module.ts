import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { ViewtodolistComponent } from './viewtodolist/viewtodolist.component';
import { TodosettingComponent } from './todosetting/todosetting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddtodoComponent,
    ViewtodolistComponent,
    TodosettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
