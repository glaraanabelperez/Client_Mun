import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';


import { ServiceGeneral } from './core/services/service-general.service';
import { ServicePedidos } from './core/servicios-pedidos/service-pedidos.service';
import { ServiceProtected } from './core/services/service-protected';

import { AuthService } from './auth-services/auth.service';
import { GuardsGuard } from './guards/guards.guard';

import { AppComponent } from './app.component';
import { CabeceraComponent} from './publicComponent/cabecera/cabecera.component';
import { NavComponent} from './publicComponent/nav/nav.component';
import { NavSecundario } from './publicComponent/nav-secundario/nav-secundario';
import { NavAdmin } from './protected/nav-admin/nav-admin';
import { HomeComponent } from './publicComponent/home/home.component';
import { GaleriaComponent} from './publicComponent/galeria/galeria.component';
import { ListCardComponent} from './publicComponent/lista-card/list-card.component';
import { VerPedido } from './publicComponent/list-ver-pedido/ver-pedido.component';
import { FooterComponent } from './publicComponent/footer/footer.component';
import { HomeMatizo} from '../app/home-matizo/home-matizo';
import { CabeceraMatizo} from '../app/home-matizo/cabecera-matizo/cabecera-matizo';


import { LogInComponent } from './publicComponent/log-in/log-inWjn.component';
import { ProtectedComponent } from './protected/protected.component';
import { ListaProdAdmin } from './protected/lista-prod/lista-prod-admin';
import { AddProduct } from './protected/add-prod/add-prod';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './protected/categories/categories.component';
import { DiscountsComponent } from './protected/discounts/discounts.component';
import { MarcasComponent } from './protected/marcas/marcas.component';
import { CategoryDialogComponent } from './protected/categories/catgeory-dialog/categroy-dialog.component';

export const childrenRoute:Routes=[
{path: '', redirectTo: 'home/:nombre', pathMatch:'full'},
{path: 'list', component: ListCardComponent},
{path: 'pedidos', component:VerPedido},
];

export const childrenRouteProducts:Routes=[
  {path: 'formulario',component: AddProduct,canActivate: [GuardsGuard]},
  {path: 'lista-productos', component:ListaProdAdmin},
  {path: 'categorias', component:CategoriesComponent},
];

const routes: Routes = [

{path: '', redirectTo: 'home-matizo', pathMatch:'full'},
{path: 'home-matizo', component: HomeMatizo,},
{path: 'home/:nombre', component: HomeComponent, children:childrenRoute},
{path: 'login', component:LogInComponent},
{path: 'protected',component: ProtectedComponent,children:childrenRouteProducts},


];

@NgModule({

  declarations: [
    AppComponent,
    CabeceraComponent,
    NavComponent,
    NavSecundario,
    NavAdmin,
    HomeComponent,
    GaleriaComponent,
    ListCardComponent,
    FooterComponent,
    LogInComponent,
    ProtectedComponent,
    ListaProdAdmin,
    VerPedido,
    HomeMatizo,
    CabeceraMatizo,
    AddProduct,
    CategoriesComponent,
    DiscountsComponent,
    MarcasComponent,
    CategoryDialogComponent
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
    ServiceGeneral, 
    AuthService, 
    GuardsGuard, 
    ServicePedidos,
    ServiceProtected
  ],
  bootstrap: [
    AppComponent
  ],

})
export class AppModule { }
