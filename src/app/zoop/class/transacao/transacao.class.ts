import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { ICartaoNaoPresente } from "./models/cartao_nao_presente.model";


export class Transacao {

  constructor() { }

  public CriarCartaoNaoPresente(cartaoNaoPresente: ICartaoNaoPresente) {

    return Client.post(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/transactions`, JSON.stringify(cartaoNaoPresente));

  }

}
