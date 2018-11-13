import { Observable } from "rxjs";
import { Client } from "src/app/app.module";
import { MARKETPLACE_ID } from "../../constants/marketplace_id.constant";
import { EVendedorStatus } from "../../enums/vendedor.status.enum";
import { EVendedorType } from "../../enums/vendedor.type.enum";
import { IAddress } from "./models/address.model";
import { IBusinessAddress } from "./models/business_address.model";
import { IOwner } from "./models/owner.model";
import { IOwnerAddress } from "./models/owner_address.model";
import { IEmpresa, IIndividuo } from "./models/vendedor.model";

export class Vendedor<T extends IEmpresa | IIndividuo> {

  id:                     string;
  type:                   EVendedorType;
  status?:                EVendedorStatus;
  resource:               string;
  account_balance:        number;
  current_balance:        number;
  fiscal_responsibility:  string;
  description:            string;
  statement_descriptor:   string;
  default_debit:          string;
  default_credit:         string;
  mcc:                    number;
  metadata:               any;
  created_at:             string;
  updated_at:             string;
  show_profile_online:    boolean;
  owner:                  IOwner;
  business_name:          string;
  business_phone:         string;
  business_email:         string;
  business_website:       string;
  business_description:   string;
  business_facebook:      string;
  business_twitter:       string;
  ein:                    string; // CNPJ do Vendendor
  business_address:       IBusinessAddress;
  owner_address:          IOwnerAddress;
  delinquent:             boolean;
  first_name:             string;
  last_name:              string;
  email:                  string;
  phone_number:           string;
  taxpayer_id:            string;
  birthdate:              string;
  address:                IAddress;
  facebook:               string;
  twitter:                string;
  is_mobile:              boolean;

  constructor(vendedor?: T) {
    if (vendedor) {
      this.InicializarVendedor(vendedor);
      if (Vendedor.IsEmpresa(vendedor)) {
        this.InicializarEmpresa(<IEmpresa>vendedor);
      } else {
        this.InicializarIndividuo(<IIndividuo>vendedor);
      }
    }
  }

  public static CriarVendedorIndividuo(vendedor: Vendedor<IIndividuo>): Observable<IIndividuo> {
    return Client.post<IIndividuo>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/individuals`, JSON.stringify(vendedor));
  }

  public static CriarVendedorEmpresa(vendedor: Vendedor<IEmpresa>): Observable<IEmpresa> {
    return Client.post<IEmpresa>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/businesses`, JSON.stringify(vendedor));
  }

  /**
   * @param documento CPF/ CNPJ do vendedor
   * @param vendedor objeto vendedor (para definir o tipo de vendedor)
   * @description Busca vendedor baseado no CPF/CNPJ
  */
  public static async BuscaVendedor(documento: string, vendedor: Vendedor<IIndividuo | IEmpresa>): Promise<Vendedor<IIndividuo | IEmpresa>> {
    let result: IIndividuo | IEmpresa;
    if (Vendedor.IsEmpresa(vendedor)) {
      result = await Client.get<IEmpresa>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/search?ein=${documento}`).toPromise();
      } else {
        result = await Client.get<IIndividuo>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/search?taxpayer_id=${documento}`).toPromise();
      }
    if (result) {
      return new Vendedor(result);
    }
    return undefined;
  }

  public static async ListaVendedores(): Promise<Array<Vendedor<IIndividuo | IEmpresa>>> {
    const retornoGet: any = await Client.get(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers`).toPromise();
    const vendedores: Array<IIndividuo | IEmpresa> = retornoGet.items;
    const retorno = new Array<Vendedor<IIndividuo | IEmpresa>>();
    vendedores.forEach(vendedor => {
      retorno.push(new Vendedor(vendedor));
    });
    return retorno;
  }

  private static IsEmpresa(classeOuInterface: Vendedor<IEmpresa | IIndividuo> | ( Vendedor<IEmpresa | IIndividuo> | IEmpresa | IIndividuo )): classeOuInterface is IEmpresa {
    return (<Vendedor<IEmpresa> | IEmpresa>classeOuInterface).ein === EVendedorType.business;
  }

  private InicializarEmpresa(vendedor: IEmpresa): void {
    this.owner = vendedor.owner;
    this.business_name = vendedor.business_name;
    this.business_phone = vendedor.business_phone;
    this.business_email = vendedor.business_email;
    this.business_website = vendedor.business_website;
    this.business_description = vendedor.business_description;
    this.business_facebook = vendedor.business_facebook;
    this.business_twitter = vendedor.business_twitter;
    this.ein = vendedor.ein;
    this.business_address = vendedor.business_address;
    this.owner_address = vendedor.owner_address;
    this.delinquent = vendedor.delinquent;
  }

  private InicializarIndividuo(vendedor: IIndividuo) {
    this.first_name = vendedor.first_name;
    this.last_name = vendedor.last_name;
    this.email = vendedor.email;
    this.phone_number = vendedor.phone_number;
    this.taxpayer_id = vendedor.taxpayer_id;
    this.birthdate = vendedor.birthdate;
    this.address = vendedor.address;
    this.facebook = vendedor.facebook;
    this.twitter = vendedor.twitter;
    this.is_mobile = vendedor.is_mobile;
  }

  private InicializarVendedor(vendedor: IEmpresa | IIndividuo) {
    this.id = vendedor.id;
    this.status = vendedor.status;
    this.resource = vendedor.resource;
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
}
