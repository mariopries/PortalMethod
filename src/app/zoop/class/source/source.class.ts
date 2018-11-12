import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { ISource } from "./models/source.model";

export class Source {

  constructor() {}

  public CriarSourceUtilizacaoTransacao(source: ISource) {

    return Client.post<ISource>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sources`, JSON.stringify(source));

  }

}