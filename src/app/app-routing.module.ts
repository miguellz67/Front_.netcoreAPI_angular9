import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsCardsComponent } from './products/products-cards/products-cards.component';
import { HomeComponent } from './home/home.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { ContatoComponent } from './contato/contato.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'products', component: ProductsCardsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'estoque', component: EstoqueComponent},
  { path: 'contato', component: ContatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }