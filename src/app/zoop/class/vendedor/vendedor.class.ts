import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { IVendedor } from "./models/vendedor.model";

export class Vendedor {

    constructor() { }

    public CriarNovoVendedor(vendedor: IVendedor) {

        return Client.post<IVendedor>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/individuals`, JSON.stringify(vendedor));

    }
}