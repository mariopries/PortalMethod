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

  id:                     string;             // Identificador exclusivo para este vendedor
  type:                   EVendedorType;
  status?:                EVendedorStatus;
  resource:               string;             // Value: seller
  account_balance:        number;
  current_balance:        number;
  fiscal_responsibility:  string;             // ID de vendedor responsável por receber os créditos pelas vendas
  description:            string;             // Uma string arbitrária que você pode anexar a um recurso de vendedor
  statement_descriptor:   string;             // Um descritor de declaração é o nome da empresa que aparece no extrato mensal do cartão de crédito do cliente. Permite que o cliente identifique rapidamente as transações reduzindo disputas e atendimento ao cliente
  default_debit:          string;             // O método de pagamento padrão (cartão ou conta bancária) associado a um vendedor que será usado, por exemplo, para debitar a conta bancária ou cartão de crédito
  default_credit:         string;             // O banco bancário padrão associado a um vendedor que será usado para enviar dinheiro (crédito) a conta bancária
  mcc:                    number;             // Um código de 4 dígitos designado por uma empresa de cartão de crédito que lista o produto, serviço ou linha de negócios de um comerciante (Merchant Category Codes)
  metadata:               any;                // Mapeamento de chaves de string para valores de sequência de caracteres. key (Chave) é o identificador para os metadados (máximo de 30 caracteres). value (valor) é a informação a ser armazenada como metadados.
  created_at:             string;             // W3C Datetime Format para a criação da data (yyyy-mm-ddThh:mm:ssZ)
  updated_at:             string;             // W3C Datetime Format para a última atualização (yyyy-mm-ddThh:mm:ssZ)
  show_profile_online:    boolean;            // Pode publicar sua página para tornar a informação comercial visível aos clientes on-line.
  owner:                  IOwner;
  business_name:          string;
  business_phone:         string;
  business_email:         string;
  business_website:       string;
  business_description:   string;
  business_facebook:      string;
  business_twitter:       string;
  ein:                    string;             // CNPJ do Vendendor
  business_address:       IBusinessAddress;
  owner_address:          IOwnerAddress;
  delinquent:             boolean;
  first_name:             string;             // Contém o primeiro nome do vendedor
  last_name:              string;             // Contém o sobrenome do vendedor
  email:                  string;             // Endereço de e-mail deste vendedor
  phone_number:           string;             // Formatação do número E.164 para o telefone do vendedor. Os números E.164 podem ter um máximo de quinze dígitos e geralmente são escritos da seguinte forma: [+] [código do país] [número do assinante, incluindo o código de área].
  taxpayer_id:            string;             // Um número de identificação do contribuinte é usado para registrar e acompanhar os pagamentos de impostos
  birthdate:              string;             // Data de nascimento do vendedor individual ou representante do negócio. O formato é AAAA-MM, e. "1980-05"
  address:                IAddress;
  facebook:               string;             // ID do Facebook ou nome de usuário do vendedor ou representante do negócio.
  twitter:                string;             // ID do Twitter ou nome de usuário do vendedor ou representante do negócio
  is_mobile:              boolean;            // Seja ou não o negócio móvel.

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

  /**
   * @description Criar novo vendedor do tipo indivíduo
   * @param vendedor Objeto do tipo Vendedor indivíduo recebendo atributos da interface na criação (IIndividuo)
   */
  public static CriarVendedorIndividuo(vendedor: Vendedor<IIndividuo>): Observable<IIndividuo> {
    return Client.post<IIndividuo>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/individuals`, JSON.stringify(vendedor));
  }

   /**
   * @description Criar novo vendedor do tipo empresa
   * @param vendedor Objeto do tipo Vendedor empresa recebendo atributos da interface na criação (IEmpresa)
   */
  public static CriarVendedorEmpresa(vendedor: Vendedor<IEmpresa>): Observable<IEmpresa> {
    return Client.post<IEmpresa>(`https://api.zoop.ws/v1/marketplaces/${MARKETPLACE_ID}/sellers/businesses`, JSON.stringify(vendedor));
  }

  /**
   * @description Buscando de vendedor por CPF/CNPJ
   * @param documento CPF/ CNPJ do vendedor
   * @param vendedor Objeto vendedor (para definir o tipo de vendedor)
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

  /**
   * @description Listando vendedores
  */
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
