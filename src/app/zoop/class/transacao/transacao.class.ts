import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { ICartaoNaoPresente } from "./models/cartao_nao_presente.model";
import { ITransacao } from "./models/transacao.model";


export class Transacao {

  constructor() { }

  public CriarCartaoNaoPresente(cartaoNaoPresente: ICartaoNaoPresente) {

    return Client.post<ITransacao>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/transactions`, JSON.stringify(cartaoNaoPresente));

  }

  public CriaTransacao(transacao: ITransacao){

    return Client.post<ITransacao>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/transactions`, JSON.stringify(transacao));
    
  }

}
