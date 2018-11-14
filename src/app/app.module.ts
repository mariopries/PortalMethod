import { MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule } from "@angular/material/";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { NgModule, Injector } from "@angular/core";

import { AppComponent } from "./app.component";
import { TesteComponent } from "./telas/teste/teste.component";
import { DeveloperMenuComponent } from "./telas/developer-menu/developer-menu.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatRadioModule } from "@angular/material";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { appRoutes } from "./app.routing";
import { RouterModule } from "@angular/router";
import { ZoopHeaderInterceptor } from "./zoop/services/zoop-header-interceptor.service";
import { ZoopErrorInterceptor } from "./zoop/services/zoop-error-interceptor.service";
import { CardModule } from 'ngx-card/ngx-card';
import { TesteFormComponent } from './teste-form/teste-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendedoresComponent } from './telas/vendedores/vendedores.component';
import { HomeComponent } from './telas/home/home.component';
import { UppercaseDirective } from './directives/uppercase.directive';
import { CurrencyPipe } from "@angular/common";
import { MoneyPipe } from './pipes/money.pipe';
import { NumeroPipe } from './pipes/numero.pipe';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BasePopupComponent } from './components/base-popup/base-popup.component';
import { LoadingComponent } from './components/loading/loading.component';

export let Client: HttpClient;

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent, TesteComponent, DeveloperMenuComponent, NavbarComponent, ToolbarComponent, TesteFormComponent, VendedoresComponent, HomeComponent, UppercaseDirective, MoneyPipe, NumeroPipe, BasePopupComponent, LoadingComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CardModule,
    MatRadioModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ZoopErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ZoopHeaderInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [BasePopupComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    Client = this.injector.get<HttpClient>(HttpClient);
  }
}
