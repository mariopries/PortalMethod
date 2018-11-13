import { Component, OnInit } from "@angular/core";
import { Token } from "src/app/zoop/class/token/token.class";
import { ICard } from "src/app/zoop/class/transacao/models/card.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Transacao } from "src/app/zoop/class/transacao/transacao.class";
import { ICartaoNaoPresente } from "src/app/zoop/class/transacao/models/cartao_nao_presente.model";
import { ETransacaoPaymentType } from "src/app/zoop/enums/transacao.payment-type.enum";
import { ESourceType } from "src/app/zoop/enums/source.type.enum";
import { ETransacaoMode } from "src/app/zoop/enums/transacao.mode.enum";
import { Client } from "src/app/app.module";

@Component({
  selector: "app-developer-menu",
  templateUrl: "./developer-menu.component.html",
  styleUrls: ["./developer-menu.component.css"]
})
export class DeveloperMenuComponent implements OnInit {
  public baseForm: FormGroup;
  public precosIndividuais = new Array();
  public precoTotal = 0;
  public quantidades = new Array();
  public names = new Array();
  constructor(fb: FormBuilder) {
    this.baseForm = fb.group({
      cardNumber: null,
      cardFirstName: "",
      cardLastName: "",
      cardExpiry: null,
      cardCVC: null
    });
  }

  ngOnInit() {
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
    // this.names.push(this.getName());
  }

  public async init() {
    const card = <ICard>{
      card_number: "5356066320271893",
      expiration_month: "07",
      expiration_year: "2020",
      holder_name: "José Inacio",
      security_code: "123"
    };
    const result = await Token.CriarTokenCartao(card).toPromise();

    console.log(result);
  }

  public async onEnviar($event) {
    if (this.baseForm.enabled) {
      this.baseForm.disable();
      const cartao = <ICard>{
        card_number: this.baseForm.controls["cardNumber"].value,
        expiration_month: this.baseForm.controls["cardExpiry"].value.substr(0, 2),
        expiration_year: this.baseForm.controls["cardExpiry"].value.substr(this.baseForm.controls["cardExpiry"].value.length - 2, this.baseForm.controls["cardExpiry"].value.length),
        holder_name: `${this.baseForm.controls["cardFirstName"].value} ${this.baseForm.controls["cardLastName"].value}`,
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
      const result = await Transacao.CriarCartaoNaoPresente(transacao).toPromise();
      console.log(result);
    }
  }

  public onCancelar($event) {
    this.baseForm.reset();
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
}
