import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from './services/loading.service';

import { AuthService } from './auth-services/auth.service';
import { GuardsGuard } from './guards/guards.guard';
import { OrderService } from './orders/service/order.service';



import { AppComponent } from './app.component';
import { GaleriaComponent } from './core/galeria/galeria.component';
import { HomeComponent } from './core/home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { CabeceraComponent} from './core/cabecera/cabecera.component';

import { LogInComponent } from './core/log-in/log-inWjn.component';
import { ProductsComponent } from './core/products/products.component';
import { MarcaDialogComponent } from './core/products/marcas/marca-dialog/marca-dialog.component';
import { DiscountDialogComponent } from './core/products/discounts/discount-dialog/discount-dialog.component';
import { CategoryDialogComponent } from './core/products/categories/catgeory-dialog/categroy-dialog.component';
import { ListProductsComponent } from './core/products/listProducts/listProducts.component'
import { ProductDialogComponent } from './core/products/listProducts/product/product.component';
import { CategoriesComponent } from './core/products/categories/categories.component';
import { MarcasComponent } from './core/products/marcas/marcas.component';
import { DiscountsComponent } from './core/products/discounts/discounts.component';
import { ImageDialogComponent } from './core/products/listProducts/image-dialog/image-dialog.component';
import { ContactComponent } from './core/contact/contact.component';
import { OrderList } from './orders/order-list/order-list.component';
import { ProductViewComponent } from './core/products/listProducts/product_view/product-view.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



export const childrenRoute:Routes=[
// {path: '', redirectTo: 'home/:nombre', pathMatch:'full'},
{path: 'pedidos', component:OrderList},
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
{path: 'colores', component: HomeComponent, children:childrenRoute},
{path: 'login', component:LogInComponent},
{path: 'productos',component: ProductsComponent,children:childrenRouteProducts},
{path: 'contacto',component: ContactComponent},
{path: '', redirectTo: '/colores', pathMatch:'full'},

];

@NgModule({

  declarations: [
    AppComponent,
    GaleriaComponent,
    HomeComponent,
    FooterComponent,
    LogInComponent,
    CabeceraComponent,
    ContactComponent,
    ProductsComponent,
    DiscountsComponent,
    MarcasComponent,
    CategoriesComponent,
    ListProductsComponent,
    OrderList,
    ProductDialogComponent,
    CategoryDialogComponent,
    DiscountDialogComponent,
    MarcaDialogComponent,
    ImageDialogComponent,
    ProductViewComponent
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
    LoadingService,
    AuthService, 
    GuardsGuard, 
    OrderService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    AppComponent
  ],

})
export class AppModule { }
