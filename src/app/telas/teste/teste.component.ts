import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/zoop/class/token/models/token.model';
import { Token } from 'src/app/zoop/class/token/token.class';
import { ICard } from 'src/app/zoop/class/transacao/models/card.model';
import { ICartaoNaoPresente } from 'src/app/zoop/class/transacao/models/cartao_nao_presente.model';
import { ITransacao } from 'src/app/zoop/class/transacao/models/transacao.model';
import { Transacao } from 'src/app/zoop/class/transacao/transacao.class';
import { ETransacaoMode } from 'src/app/zoop/enums/transacao.mode.enum';
import { ETransacaoPaymentType } from 'src/app/zoop/enums/transacao.payment-type.enum';
import { Comprador } from 'src/app/zoop/class/comprador/comprador.class';
import { IComprador } from 'src/app/zoop/class/comprador/models/comprador.model';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})

export class TesteComponent implements OnInit {
  tokenCartao: IToken;
  costumer: IComprador;

  constructor() { }

  ngOnInit() {

    this.init();
  }

  public async init() {

    const comprador = new Comprador();
    const costumer = <IComprador>{
      first_name: "Mario",
      last_name: "Testes",
      taxpayer_id: "40186147058"
    };

    this.costumer = await comprador.CriarComprador(costumer).toPromise();
    console.log(this.costumer);

    const transacao = new Transacao();
    const boleto = <ITransacao>{
      amount: 2000,
      payment_type: ETransacaoPaymentType.boleto,
      currency: "BRL",
      on_behalf_of: "0056dcc116d04a199145308e4786454c",
      customer: this.costumer.id,
      payment_method: {
        expiration_date: "20181112",
        top_instructions: ["Testes", "Testando 2312312"]
      }
    };

    const result = await transacao.CriaTransacao(boleto).toPromise();
    console.log(result);
    window.location.href = result.payment_method.url;
  }

  public async credito() {

    const token = new Token();
    const card = <ICard>{
      card_number: "4761340000000035",
      expiration_month: "07",
      expiration_year: "2020",
      holder_name: "José Inacio",
      security_code: "123"
    };
    this.tokenCartao = await token.CriarTokenCartao(card).toPromise();
    console.log(this.tokenCartao);

    this.transaction();

  }

  public async transaction() {

    const transacao = new Transacao();

    const cartaoNaoPresente = <ICartaoNaoPresente>{
      amount: 200,
      currency: "BRL",
      description: "Teste",
      on_behalf_of: "0056dcc116d04a199145308e4786454c",
      token: this.tokenCartao.id,  // Falta capturar a estrutura de retorno da requisição do token
      payment_type: ETransacaoPaymentType.credit,
      installment_plan: {
        mode: ETransacaoMode.interest_free,
        number_installments: 6
      }
    };

    const result = await transacao.CriarCartaoNaoPresente(cartaoNaoPresente).toPromise();
    console.log(result);

  }

}
