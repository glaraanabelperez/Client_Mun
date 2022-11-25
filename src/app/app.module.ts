import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth-services/auth.service';
import { GuardsGuard } from './guards/guards.guard';
import { ServicePedidos } from './publicComponent/products/orders/servicios-pedidos/service-pedidos.service';



import { AppComponent } from './app.component';

import { HomeComponent } from './publicComponent/home/home.component';
import { GaleriaComponent} from './publicComponent/galeria/galeria.component';
import { VerPedido } from './publicComponent/pedidos/ver-pedido.component';
import { FooterComponent } from './publicComponent/footer/footer.component';
import { CabeceraComponent} from './publicComponent/cabecera/cabecera.component';

import { LogInComponent } from './publicComponent/log-in/log-inWjn.component';
import { ProductsComponent } from './publicComponent/products/products.component';
import { MarcaDialogComponent } from './publicComponent/products/marcas/marca-dialog/marca-dialog.component';
import { DiscountDialogComponent } from './publicComponent/products/discounts/discount-dialog/discount-dialog.component';
import { CategoryDialogComponent } from './publicComponent/products/categories/catgeory-dialog/categroy-dialog.component';
import { ListProductsComponent } from './publicComponent/products/listProducts/listProducts.component';
import { ProductDialogComponent } from './publicComponent/products/listProducts/product/product.component';
import { CategoriesComponent } from './publicComponent/products/categories/categories.component';
import { MarcasComponent } from './publicComponent/products/marcas/marcas.component';
import { DiscountsComponent } from './publicComponent/products/discounts/discounts.component';
import { ImageDialogComponent } from './publicComponent/products/listProducts/image-dialog/image-dialog.component';
import { ContactComponent } from './publicComponent/contact/contact..component';



export const childrenRoute:Routes=[
// {path: '', redirectTo: 'home/:nombre', pathMatch:'full'},
{path: 'pedidos', component:VerPedido},
];

export const childrenRouteProducts:Routes=[
  {path: 'formulario',component: ProductDialogComponent,canActivate: [GuardsGuard]},
  {path: 'lista-productos/:filter/:value', component:ListProductsComponent},
  {path: 'lista-productos/:filter', component:ListProductsComponent},
  {path: 'lista-productos', component:ListProductsComponent},

  {path: 'categorias', component:CategoriesComponent ,canActivate: [GuardsGuard]},
  {path: 'marcas', component:MarcasComponent ,canActivate: [GuardsGuard]},
  {path: 'descuentos', component:DiscountsComponent ,canActivate: [GuardsGuard]},
];

const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch:'full'},
{path: 'home', component: HomeComponent, children:childrenRoute},
{path: 'login', component:LogInComponent},
{path: 'productos',component: ProductsComponent,children:childrenRouteProducts},
{path: 'contacto',component: ContactComponent},

];

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    GaleriaComponent,
    FooterComponent,
    LogInComponent,
    CabeceraComponent,
    ContactComponent,
    ProductsComponent,
    DiscountsComponent,
    MarcasComponent,
    CategoriesComponent,
    ListProductsComponent,
    VerPedido,
    ProductDialogComponent,
    CategoryDialogComponent,
    DiscountDialogComponent,
    MarcaDialogComponent,
    ImageDialogComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
  exports: [
    AppComponent 
    ],
    
  providers: [
    AuthService, 
    GuardsGuard, 
    ServicePedidos,
  ],
  bootstrap: [
    AppComponent
  ],

})
export class AppModule { }
