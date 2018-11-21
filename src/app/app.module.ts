import { MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule, MatDividerModule, MatStepperModule, MatMenuModule, MatBadgeModule } from "@angular/material/";
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
import { CardModule } from "ngx-card/ngx-card";
import { TesteFormComponent } from "./teste-form/teste-form.component";
import { ReactiveFormsModule, NG_VALIDATORS } from "@angular/forms";
import { VendedoresComponent } from "./telas/vendedores/vendedores.component";
import { HomeComponent } from "./telas/home/home.component";
import { UppercaseDirective } from "./directives/uppercase.directive";
import { CurrencyPipe } from "@angular/common";
import { MoneyPipe } from "./pipes/money.pipe";
import { NumeroPipe } from "./pipes/numero.pipe";
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { BasePopupComponent } from "./components/base-popup/base-popup.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { CartaoCreditoFormComponent } from './components/cartao-credito-form/cartao-credito-form.component';
import { CartaoCreditoComponent } from './components/cartao-credito/cartao-credito.component';
import { ProdutoCheckoutComponent } from "./components/produto-checkout/produto-checkout.component";
import { BoletoFormComponent } from './components/boleto-form/boleto-form.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { CpfDirective } from './directives/cpf.directive';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { isMobileDevice } from "./util/functions";
import { CnpjPipe } from './pipes/cnpj.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CustomValidator } from "./modules/custom-validator/custom-validator.module";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { StepperComponent } from './components/stepper/stepper.component';
import { EnterDirective } from './directives/enter.directive';

export let Client: HttpClient;

export let isMobile = {
  device: isMobileDevice(),
  small: false
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,
    DeveloperMenuComponent,
    NavbarComponent,
    ToolbarComponent,
    TesteFormComponent,
    VendedoresComponent,
    HomeComponent,
    UppercaseDirective,
    MoneyPipe,
    NumeroPipe,
    BasePopupComponent,
    LoadingComponent,
    CartaoCreditoFormComponent,
    CartaoCreditoComponent,
    ProdutoCheckoutComponent,
    BoletoFormComponent,
    CpfPipe,
    CpfDirective,
    ListaProdutosComponent,
    CnpjPipe,
    CepPipe,
    TelefonePipe,
    StepperComponent,
    EnterDirective
  ],
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
    MatProgressSpinnerModule,
    MatDividerModule,
    MatStepperModule,
    MatIconModule,
    MatMenuModule,
    CustomValidator,
    MatBadgeModule,
    CdkStepperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ZoopErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ZoopHeaderInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    CurrencyPipe,
    CpfPipe,
    TelefonePipe,
    CnpjPipe,
    { provide: NG_VALIDATORS, useExisting: CustomValidator.cpfValido, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [BasePopupComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    Client = this.injector.get<HttpClient>(HttpClient);
  }
}
