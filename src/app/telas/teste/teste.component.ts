import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/zoop/class/token/models/token.model';
import { Token } from 'src/app/zoop/class/token/token.class';
import { ICard } from 'src/app/zoop/class/transacao/models/card.model';
import { ICartaoNaoPresente } from 'src/app/zoop/class/transacao/models/cartao_nao_presente.model';
import { Transacao } from 'src/app/zoop/class/transacao/transacao.class';
import { EMode } from 'src/app/zoop/enums/mode.enum';
import { EPaymentType } from 'src/app/zoop/enums/payment-type.enum';
import { EType } from 'src/app/zoop/enums/type.enum';
import { EUsage } from 'src/app/zoop/enums/usage.enum';





@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})

export class TesteComponent implements OnInit {
  tokenCartao: IToken;

  constructor() { }

  ngOnInit() {

    this.init();
  }

  public async init() {

    const token = new Token();
    const card = <ICard>{
      card_number: "5356066320271893",
      expiration_month: "07",
      expiration_year: "2020",
      holder_name: "José Inacio",
      security_code: "123"
    };
    this.tokenCartao = await token.CriarTokenCartao(card).toPromise();

    console.log(this.tokenCartao);

    this.transaction(); // fiz mas não testei (mario)

  }

  public async transaction() {

    const transacao = new Transacao();

    const cartaoNaoPresente = <ICartaoNaoPresente>{
      amount: 200,
      currency: "BRL",
      description: "Teste",
      on_behalf_of: "0056dcc116d04a199145308e4786454c",
      token: this.tokenCartao.id,  // Falta capturar a estrutura de retorno da requisição do token
      source: {
        card: this.tokenCartao.card,
        usage: EUsage.single_use,
        amount: 200,
        type: EType.card,
        installment_plan: {
          mode: EMode.interest_free,
          number_installments: 6
        }
      },
      payment_type: EPaymentType.credit,
      installment_plan: {
        mode: EMode.interest_free,
        number_installments: 6
      }
    };

    const result = await transacao.CriarCartaoNaoPresente(cartaoNaoPresente).toPromise();

    console.log(result);

  }

}
