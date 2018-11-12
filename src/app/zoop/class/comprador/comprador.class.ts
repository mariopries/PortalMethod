import { Client } from "src/app/app.module";
import { IComprador } from "./models/comprador.model";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";

export class Comprador{

    constructor() { }

    public CriarComprador(comprador: IComprador) {
  
      return Client.post<IComprador>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/buyers`, JSON.stringify(comprador));
  
    }
    
}