import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { ViewtodolistComponent } from './viewtodolist/viewtodolist.component';
import { TodosettingComponent } from './todosetting/todosetting.component';
import { AboutComponent } from './about/about.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // it will serve calendar animation and app animations it self as well. 

import { ToastrModule } from 'ngx-toastr';
import { LoadingspinnerComponent } from './loadingspinner/loadingspinner.component';

import { NgAddToCalendarModule } from '@trademe/ng-add-to-calendar';

import { HttpClientModule } from '@angular/common/http'

import { MomentModule } from 'ngx-moment';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { FiltersPipe } from './filters.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddtodoComponent,
    ViewtodolistComponent,
    TodosettingComponent,
    LoadingspinnerComponent,
    FiltersPipe,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgAddToCalendarModule,
    HttpClientModule,
    MomentModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibGlieWFwYWdlcyIsImEiOiJjamtvYmE0ZWUxNm02M2x0aDR0MnZwanhzIn0.9N_nairWx_XZyxhQQCS2hg', // Can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
