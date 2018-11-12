import { IAddress } from "./address.model";
import { EVendedorStatus } from "src/app/zoop/enums/vendedor.status.enum";
import { EVendedorType } from "src/app/zoop/enums/vendedor.type.enum";
import { IOwner } from "./owner.model";
import { IBusinessAddress } from "./business_address.model";
import { IOwnerAddress } from "./owner_address.model";
import { Vendedor } from "../vendedor.class";

export interface IVendedor<T>{

    id:                     string;             //Identificador exclusivo para este vendedor
    status?:                EVendedorStatus;
    resource:               string;             //Value: seller
    type:                   T;
    account_balance:        number;
    current_balance:        number;
    fiscal_responsibility:  string;             //ID de vendedor responsável por receber os créditos pelas vendas
    description:            string;             //Uma string arbitrária que você pode anexar a um recurso de vendedor
    statement_descriptor:   string;             //Um descritor de declaração é o nome da empresa que aparece no extrato mensal do cartão de crédito do cliente. Permite que o cliente identifique rapidamente as transações reduzindo disputas e atendimento ao cliente
    default_debit:          string;             //O método de pagamento padrão (cartão ou conta bancária) associado a um vendedor que será usado, por exemplo, para debitar a conta bancária ou cartão de crédito
    default_credit:         string;             //O banco bancário padrão associado a um vendedor que será usado para enviar dinheiro (crédito) a conta bancária
    mcc:                    number;             //Um código de 4 dígitos designado por uma empresa de cartão de crédito que lista o produto, serviço ou linha de negócios de um comerciante (Merchant Category Codes)
    metadata:               any;                //Mapeamento de chaves de string para valores de sequência de caracteres. key (Chave) é o identificador para os metadados (máximo de 30 caracteres). value (valor) é a informação a ser armazenada como metadados.
    created_at:             string;             //W3C Datetime Format para a criação da data (yyyy-mm-ddThh:mm:ssZ)
    updated_at:             string;             //W3C Datetime Format para a última atualização (yyyy-mm-ddThh:mm:ssZ)
    show_profile_online:    boolean;            //Pode publicar sua página para tornar a informação comercial visível aos clientes on-line.
}

export interface IIndividuo extends Vendedor {
    //-- Elementos de vendedor do tipo indivíduo
    first_name:            string;             //Contém o primeiro nome do vendedor
    last_name:             string;             //Contém o sobrenome do vendedor
    email:                 string;             //Endereço de e-mail deste vendedor
    phone_number:          string;             //Formatação do número E.164 para o telefone do vendedor. Os números E.164 podem ter um máximo de quinze dígitos e geralmente são escritos da seguinte forma: [+] [código do país] [número do assinante, incluindo o código de área].
    taxpayer_id:           string;             //Um número de identificação do contribuinte é usado para registrar e acompanhar os pagamentos de impostos
    birthdate:             string;             //Data de nascimento do vendedor individual ou representante do negócio. O formato é AAAA-MM, e. "1980-05"
    address:               IAddress;
    facebook:              string;             //ID do Facebook ou nome de usuário do vendedor ou representante do negócio.
    twitter:               string;             //ID do Twitter ou nome de usuário do vendedor ou representante do negócio
    is_mobile:             boolean;            //Seja ou não o negócio móvel.
    //-- Fim elementos de vendedor do tipo indivíduo
}

export interface IEmpresa extends IVendedor<EVendedorType.business> {
    //-- Elementos de vendedor do tipo empresa
    owner:                 IOwner;
    business_name:         string;
    business_phone:        string;
    business_email:        string;
    business_website:      string;
    business_description:  string;
    business_facebook:     string;
    business_twitter:      string;
    ein:                   string;             //CNPJ do Vendendor
    business_address:      IBusinessAddress;
    owner_address:         IOwnerAddress;
    delinquent:            boolean;    
    //-- Fim elementos de vendedor do tipo empresa
}