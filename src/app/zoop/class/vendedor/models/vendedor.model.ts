import { EINPROGRESS } from "constants";
import { IAddress } from "./address.mode";
import { EVendedorStatus } from "src/app/zoop/enums/vendedor.status.enum";
import { EVendedorType } from "src/app/zoop/enums/vendedor.type.enum";

export interface IVendedor{

    id:                     string,         //Identificador exclusivo para este vendedor
    status?:                EVendedorStatus,
    resource:               string,         //Value: seller
    taxpayer_id:            string,         //Um número de identificação do contribuinte é usado para registrar e acompanhar os pagamentos de impostos
    type:                   EVendedorType,
    description:            string,         //Uma string arbitrária que você pode anexar a um recurso de vendedor
    first_name:             string,         //Contém o primeiro nome do vendedor
    last_name:              string,         //Contém o sobrenome do vendedor
    email:                  string,         //Endereço de e-mail deste vendedor
    phone_number:           string,         //Formatação do número E.164 para o telefone do vendedor. Os números E.164 podem ter um máximo de quinze dígitos e geralmente são escritos da seguinte forma: [+] [código do país] [número do assinante, incluindo o código de área].
    mcc:                    number,         //Um código de 4 dígitos designado por uma empresa de cartão de crédito que lista o produto, serviço ou linha de negócios de um comerciante
    birthdate:              string,         //Data de nascimento do vendedor individual ou representante do negócio. O formato é AAAA-MM, e. "1980-05"
    facebook:               string,         //ID do Facebook ou nome de usuário do vendedor ou representante do negócio.
    twitter:                string,         //ID do Twitter ou nome de usuário do vendedor ou representante do negócio
    ein:                    string,         //CNPJ do Vendendor
    address:                IAddress,
    delinquent:             boolean,
    statment_descriptor?:   string,         //Um descritor de declaração é o nome da empresa que aparece no extrato mensal do cartão de crédito do cliente. Permite que o cliente identifique rapidamente as transações reduzindo disputas e atendimento ao cliente
    default_debit:          string,         //O método de pagamento padrão (cartão ou conta bancária) associado a um vendedor que será usado, por exemplo, para debitar a conta bancária ou cartão de crédito
    default_credit:         string,         //O banco bancário padrão associado a um vendedor que será usado para enviar dinheiro (crédito) a conta bancária
    is_mobile:              boolean,        //Seja ou não o negócio móvel.
    show_profile_online:    boolean,        //Pode publicar sua página para tornar a informação comercial visível aos clientes on-line.
    mmc:                    string,         //Merchant Category Codes
    metadata:               any,            //Mapeamento de chaves de string para valores de sequência de caracteres. key (Chave) é o identificador para os metadados (máximo de 30 caracteres). value (valor) é a informação a ser armazenada como metadados.
    created_at:             string,         //W3C Datetime Format para a criação da data (yyyy-mm-ddThh:mm:ssZ)
    updated_at:             string,         //W3C Datetime Format para a última atualização (yyyy-mm-ddThh:mm:ssZ)
}