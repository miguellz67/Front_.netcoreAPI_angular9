import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';

import { EstoqueComponent } from './estoque/estoque.component';
import { ModalModule } from 'ngx-bootstrap/modal';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

import { NavComponent } from './nav/nav.component';
import { ProductsCardsComponent } from './products/products-cards/products-cards.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination'; // Módulo da dependência de paginação
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ContatoComponent } from './contato/contato.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      EstoqueComponent,
      ProductsCardsComponent,
      HomeComponent,
      ContatoComponent
   ],
   imports: [
      AccordionModule.forRoot(),
      BrowserModule,
      ModalModule.forRoot(),
      NgxPaginationModule, // Nosso módulo recém instalado
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      Ng2SearchPipeModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      BsDropdownModule.forRoot(),
      FormsModule,
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      ToastrModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
