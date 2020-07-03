import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { EstoqueComponent } from './estoque/estoque.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      EstoqueComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
