import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/zoop/class/token/token.class';
import { ICard } from 'src/app/zoop/class/transacao/models/card.model';

@Component({
  selector: 'app-developer-menu',
  templateUrl: './developer-menu.component.html',
  styleUrls: ['./developer-menu.component.css']
})
export class DeveloperMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init();
  }

  public async init() {

    const TokenUm = new Token();
    const card = <ICard>{
      card_number: "5356066320271893",
      expiration_month: "07",
      expiration_year: "2020",
      holder_name: "José Inacio",
      security_code: "123"
    };
    const result = await TokenUm.CriarTokenCartao(card).toPromise();

    console.log(result);
  }

}
