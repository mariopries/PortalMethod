import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Token } from "src/app/zoop/class/token/token.class";
import { ICard } from "src/app/zoop/class/transacao/models/card.model";
import { FormGroup, FormBuilder, AbstractControl, Form } from "@angular/forms";
import { Transacao } from "src/app/zoop/class/transacao/transacao.class";
import { ICartaoNaoPresente } from "src/app/zoop/class/transacao/models/cartao_nao_presente.model";
import { ETransacaoPaymentType } from "src/app/zoop/enums/transacao.payment-type.enum";
import { ESourceType } from "src/app/zoop/enums/source.type.enum";
import { ETransacaoMode } from "src/app/zoop/enums/transacao.mode.enum";
import { Client } from "src/app/app.module";
import { BasePopupComponent } from "src/app/components/base-popup/base-popup.component";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { LoadingComponent } from "src/app/components/loading/loading.component";
import { NgxCard } from "ngx-card/card";
import { NgxCardNameTemplate } from "ngx-card/inputs";
import { ICardJS } from "src/app/cardJS/interfaces/card.cardjs.model";
// import * as Card from "../../cardJS/card";

declare var card: any;
declare var Card: any;

@Component({
  selector: "app-developer-menu",
  templateUrl: "./developer-menu.component.html",
  styleUrls: ["./developer-menu.component.css"]
})
export class DeveloperMenuComponent implements OnInit, AfterViewInit {
  @ViewChild("loading") loading: LoadingComponent;
  @ViewChild("form") form: ElementRef<Form>;
  public card: NgxCard;
  public baseForm: FormGroup;
  public precosIndividuais = new Array();
  public precoTotal = 0;
  public quantidades = new Array();
  public names = new Array();
  constructor(fb: FormBuilder, private alert: MatDialog) {
    this.baseForm = fb.group({
      cardNumber: null,
      cardFirstName: "",
      cardLastName: "",
      cardExpiry: null,
      cardCVC: null
    });
    console.log(card);
    console.log(Card);
  }

  ngOnInit() {
    console.log(this.card);
    for (let index = 0; index < 30; index++) {
      this.names.push(this.getName());
      this.precosIndividuais.push(Math.random() * 10);
      this.quantidades.push(Math.floor(Math.random() * 100));
    }
    let resultado = 0;
    this.precosIndividuais.forEach((valor, index) => {
      resultado += valor * 100 * this.quantidades[index];
    });
    this.precoTotal = resultado;
    this.init();
  }

  ngAfterViewInit(): void {

    const cardTeste = new Card(<ICardJS>{
      form: "form",
      container: ".card-container",
      debug: true,
      formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
      }
    });
    console.log(cardTeste);
    // console.log(Card);
    // const card = new Card(<ICardJS>{
    //   form: "form",
    //   container: ".card-container",
    //   debug: true,
    //   formSelectors: {
    //     nameInput: 'input[name="first-name"], input[name="last-name"]'
    //   }
    // });
  }

  public async init() {
    const cartao = <ICard>{
      card_number: "5356066320271893",
      expiration_month: "07",
      expiration_year: "2020",
      holder_name: "José Inacio",
      security_code: "123"
    };
    const result = await Token.CriarTokenCartao(cartao).toPromise();

    console.log(result);
    this.loading.doneLoading();
  }

  public async onEnviar($event) {
    if (this.baseForm.enabled) {
      try {
        this.loading.startLoading();
        this.baseForm.disable();
        const cartao = <ICard>{
          card_number: this.baseForm.controls["cardNumber"].value,
          expiration_month: this.baseForm.controls["cardExpiry"].value.substr(
            0,
            2
          ),
          expiration_year: this.baseForm.controls["cardExpiry"].value.substr(
            this.baseForm.controls["cardExpiry"].value.length - 2,
            this.baseForm.controls["cardExpiry"].value.length
          ),
          holder_name: `${this.baseForm.controls["cardFirstName"].value} ${
            this.baseForm.controls["cardLastName"].value
          }`,
          security_code: this.baseForm.controls["cardCVC"].value
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
        console.log(transacao.amount);
        const result = await Transacao.CriarCartaoNaoPresente(
          transacao
        ).toPromise();
        console.log(result);
        this.loading.doneLoading();
        this.OpenAlert(
          `Transação número ${result.transaction_number}`,
          `Aprovada com sucesso!`
        );
        this.alert.afterAllClosed.subscribe(() => {
          this.baseForm.reset();
          this.baseForm.updateValueAndValidity();
          this.baseForm.enable();
        });
      } catch (error) {
        console.log(error);
        this.loading.doneLoading();
        this.baseForm.reset();
        this.baseForm.updateValueAndValidity();
        this.baseForm.enable();
      }
    }
    console.log(this.card);
  }

  public onCancelar($event) {
    this.baseForm.reset();
    this.baseForm.enable();
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
