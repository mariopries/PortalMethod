import { Client } from "src/app/app.module";
import { ICard } from "../transacao/models/card.model";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { IToken } from "./models/token.model";

export class Token {

  constructor() {}

  public CriarTokenCartao(cartao: ICard) {

    return Client.post<IToken>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/cards/tokens`, JSON.stringify(cartao));

  }

}