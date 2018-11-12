import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { IIndividuo, IEmpresa, IVendedor } from "./models/vendedor.model";
import { EVendedorType } from "../../enums/vendedor.type.enum";
import { Observable } from "rxjs";
import { EVendedorStatus } from "../../enums/vendedor.status.enum";

export class Vendedor implements IVendedor<(IEmpresa | IIndividuo)> {
    id: string;
    status?: EVendedorStatus;
    resource: string;
    type: IIndividuo | IEmpresa;
    account_balance: number;
    current_balance: number;
    fiscal_responsibility: string;
    description: string;
    statement_descriptor: string;
    default_debit: string;
    default_credit: string;
    mcc: number;
    metadata: any;
    created_at: string;
    updated_at: string;
    show_profile_online: boolean;

    constructor(vendedor: IVendedor<(IEmpresa | IIndividuo)>) {
        this.id = vendedor.id;
        this.status = vendedor.status;
        this.resource = vendedor.resource;
        this.type = vendedor.type;
        this.account_balance = vendedor.account_balance;
        this.current_balance = vendedor.current_balance;
        this.fiscal_responsibility = vendedor.fiscal_responsibility;
        this.description = vendedor.description;
        this.statement_descriptor = vendedor.statement_descriptor;
        this.default_debit = vendedor.default_debit;
        this.default_credit = vendedor.default_credit;
        this.mcc = vendedor.mcc;
        this.metadata = vendedor.metadata;
        this.created_at = vendedor.created_at;
        this.updated_at = vendedor.updated_at;
        this.show_profile_online = vendedor.show_profile_online;
    }

    public static CriarVendedorIndividuo(vendedor: IIndividuo) {

        return Client.post<IIndividuo>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/individuals`, JSON.stringify(vendedor));

    }

    public static CriarVendedorEmpresa(vendedor: IEmpresa) {

        return Client.post<IEmpresa>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/businesses`, JSON.stringify(vendedor));

    }

    public static BuscaVendedor(documento: string, vendedor: IIndividuo|IEmpresa): Observable<IIndividuo|IEmpresa> {

        console.log(vendedor.type);
        
        if (vendedor.type === EVendedorType.individual) {
            return Client.get<IIndividuo>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/search?taxpayer_id=${documento}`);
        }
        else {
            return Client.get<IEmpresa>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/search?ein=${documento}`);
        }

    }
}