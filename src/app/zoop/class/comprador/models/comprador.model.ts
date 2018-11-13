import { EDefaultReceiptDeliverMethod } from "src/app/zoop/enums/comprador.default_receipt_delivery_method.enum";
import { IAddress } from "../../vendedor/models/address.model";
import { ICard } from "../../transacao/models/card.model";
import { IBankAccount } from "src/app/zoop/models/bankaccount.model";

export abstract class IComprador {
  id: string;                                                       //Identificador único do comprador
  resource: string;                                                 //Valor: buyer
  description: string;                                              //Campo livre contendo a descrição do comprador
  first_name: string;                                               //Primeiro nome do comprador
  last_name: string;                                                //Último nome do comprador
  taxpayer_id: string;                                              //CPF ou CNPJ do comprador
  email: string;                                                    //Endereço de email do comprador
  phone_number: string;                                             //Número do telefone do comprador no formato E.164. Os números E.164 podem ter um máximo de quinze dígitos e geralmente são escritos da seguinte forma: [+] [código do país] [número do assinante, incluindo o código de área].
  birthdate: string;                                                //Data de nascimento do comprador no formato YYYY-mm-dd
  facebook: string;                                                 //Facebook ID do comprador
  twitter: string;                                                  //Twitter ID do comprador
  email_optin: boolean;                                             //Indica se o comprador gostaria ou não de receber emails. Valor padrão: false
  sms_optin: boolean;                                               //Indica se o comprador gostaria ou não de receber SMSs. Valor padrão: false
  default_receipt_delivery_method: EDefaultReceiptDeliverMethod;    //Método padrão para o envio de recibos de compras (email ou SMS).
  address: IAddress;                                                //O mesmo objeto utilizado no campo de endereço do vendedor
  payment_methods: Array<ICard | IBankAccount>;                     //Objeto "card" ou "bankaccount"
  default_debit: string;                                            //Método padrão para pagamento atribuído ao comprador que será utilizado para debitar da conta ou do cartão de débito
  default_credit: string;                                           //Método padrão para pagamento atribuído ao comprador que será utilizado para debitar da conta ou do cartão de crédito
  metadata: any;                                                    //Mapeamento de keys de string e values de caracteres. Key é o identificador para os metadados (máximo de 30 caracteres). Value é a informação a ser armazenada como metadado
  created_at: string;                                               //Data de criação do comprador no formato (yyyy-mm-ddThh:mm:ssZ)
  updated_at: string;                                               //Data da última atualização do comprador no formato (yyyy-mm-ddThh:mm:ssZ)
}
