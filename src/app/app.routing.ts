import { Routes } from "@angular/router";
import { DeveloperMenuComponent } from "./telas/developer-menu/developer-menu.component";
import { TesteComponent } from "./telas/teste/teste.component";
import { VendedoresComponent } from "./telas/vendedores/vendedores.component";

export const appRoutes: Routes = [
  { path: "", component: DeveloperMenuComponent }, 
  { path: "teste", component: TesteComponent },
  { path: "vendedores", component: VendedoresComponent }
];
