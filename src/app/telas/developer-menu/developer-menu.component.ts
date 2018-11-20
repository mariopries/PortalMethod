import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NgxCard } from "ngx-card/card";
import { isMobile } from "src/app/app.module";
import { BasePopupComponent } from "src/app/components/base-popup/base-popup.component";
import { LoadingComponent } from "src/app/components/loading/loading.component";
import { Token } from "src/app/zoop/class/token/token.class";
import { ICard } from "src/app/zoop/class/transacao/models/card.model";
import { ICartaoNaoPresente } from "src/app/zoop/class/transacao/models/cartao_nao_presente.model";
import { Transacao } from "src/app/zoop/class/transacao/transacao.class";
import { ETransacaoMode } from "src/app/zoop/enums/transacao.mode.enum";
import { ETransacaoPaymentType } from "src/app/zoop/enums/transacao.payment-type.enum";
import { CustomValidator } from "./../../modules/custom-validator/custom-validator.module";
import { Mock } from "src/app/services/mock-data.service";
// import * as Card from "../../cardJS/card";

declare var card: any;
declare var Card: any;

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: "app-developer-menu",
  templateUrl: "./developer-menu.component.html",
  styleUrls: ["./developer-menu.component.css"]
})
export class DeveloperMenuComponent implements OnInit {
  @ViewChild("loading") loading: LoadingComponent;
  @ViewChild("form") form: ElementRef<Form>;
  public pagamentoSelecionado: string = null;
  public card: NgxCard;
  public cartaoCredito: FormGroup;
  public precosIndividuais = new Array();
  public precoTotal = 0;
  public quantidades = new Array();
  public names = new Array();
  public firstRegister: FormGroup;
  public botaoEnabled = true;
  public titulo = "Selecione a forma de Pagamento";
  public produtos = Mock.Produtos(10);
  public isMobile = isMobile;
  public boleto: FormGroup;
  constructor(fb: FormBuilder, private alert: MatDialog) {
    this.cartaoCredito = fb.group({
      cardNumber: null,
      cardFirstName: "",
      cardLastName: "",
      cardExpiry: null,
      cardCVC: null
    });
    this.boleto = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      taxpayerId: new FormControl("", [
        CustomValidator.cpfValido()
      ])
    }, {
      updateOn: 'blur'
    });
  }

  ngOnInit() {
    this.loading.doneLoading();
  }

  public initBoleto() {
    this.pagamentoSelecionado = "boleto";
    this.titulo = "Preencha as informações do boleto";
  }

  public initCard() {
    this.pagamentoSelecionado = "cartao";
    this.titulo = "Preencha as informações do cartão";
  }

  onVoltar($event) {
    this.pagamentoSelecionado = null;
    this.titulo = "Selecione a forma de Pagamento";
  }

  public async onEnviar($event) {
    if (
      this.cartaoCredito &&
      this.cartaoCredito.enabled &&
      this.pagamentoSelecionado === "cartao"
    ) {
      try {
        this.loading.startLoading();
        this.cartaoCredito.disable();
        this.botaoEnabled = false;
        const cartao = <ICard>{
          card_number: this.cartaoCredito.controls["cardNumber"].value,
          expiration_month: this.cartaoCredito.controls[
            "cardExpiry"
          ].value.substr(0, 2),
          expiration_year: this.cartaoCredito.controls[
            "cardExpiry"
          ].value.substr(
            this.cartaoCredito.controls["cardExpiry"].value.length - 2,
            this.cartaoCredito.controls["cardExpiry"].value.length
          ),
          holder_name: `${this.cartaoCredito.controls["cardFirstName"].value} ${
            this.cartaoCredito.controls["cardLastName"].value
          }`,
          security_code: this.cartaoCredito.controls["cardCVC"].value
        };
        const tokenCartao = await Token.CriarTokenCartao(cartao).toPromise();
        const transacao = <ICartaoNaoPresente>{
          amount: this.precoTotal,
          currency: "BRL",
          description: "Pagamento de teste",
          payment_type: ETransacaoPaymentType.credit,
          on_behalf_of: "0056dcc116d04a199145308e4786454c",
          token: tokenCartao.id,
          installment_plan: {
            mode: ETransacaoMode.interest_free,
            number_installments: 6
          }
        };
        const result = await Transacao.CriarCartaoNaoPresente(
          transacao
        ).toPromise();
        this.loading.doneLoading();
        this.OpenAlert(
          `Transação número ${result.transaction_number}`,
          `Aprovada com sucesso!`
        );
        this.alert.afterAllClosed.subscribe(() => {
          this.cartaoCredito.reset();
          this.cartaoCredito.updateValueAndValidity();
          this.cartaoCredito.enable();
        });
      } catch (error) {
        this.OpenAlert("Erro interno", "Erro desconhecido");
        this.loading.doneLoading();
        this.cartaoCredito.reset();
        this.cartaoCredito.updateValueAndValidity();
        this.cartaoCredito.enable();
        this.botaoEnabled = true;
      }
    } else if (
      this.boleto &&
      this.boleto.enabled &&
      this.pagamentoSelecionado === "boleto"
    ) {
      this.OpenAlert("Erro", "Não implementado");
    } else {
      this.OpenAlert("Erro", "Não implementado");
    }
  }

  public onCancelar($event) {
    if (
      this.cartaoCredito &&
      !this.cartaoCredito.enabled &&
      this.pagamentoSelecionado === "cartao"
    ) {
      this.cartaoCredito.reset();
      this.cartaoCredito.enable();
    } else if (
      this.boleto &&
      this.boleto.enabled &&
      this.pagamentoSelecionado === "boleto"
    ) {
      this.OpenAlert("Erro", "Não implementado");
    } else {
      this.OpenAlert("Erro", "Não implementado");
    }
  }

  public getName() {
    const index = Math.floor(Math.random() * 9);
    const names = [
      "tomato",
      "potato",
      "cucumber",
      "carrot",
      "onion",
      "broccoli",
      "cabbage",
      "spinach",
      "lettuce",
      "pea",
      "kale",
      "radish",
      "celery",
      "beet",
      "eggplant",
      "garlic",
      "zucchini",
      "bell pepper",
      "turnip",
      "corn",
      "parsnip",
      "okra",
      "scallion",
      "asparagus",
      "leek",
      "green bean",
      "shallot",
      "cauliflower",
      "rutabaga",
      "watercress",
      "kohlrabi",
      "endive",
      "artichoke",
      "bean"
    ];
    return names[index];
  }

  public OpenAlert(title: string, description: string) {
    const config = new MatDialogConfig();
    config.data = { title: title, description: description };
    config.minWidth = "200px";
    const dialogRef = this.alert.open(BasePopupComponent, config);
  }
}
