import { ETransacaoStatus } from "src/app/zoop/enums/transacao.status.enum";
import { ETransacaoPaymentType } from "src/app/zoop/enums/transacao.payment-type.enum";
import { IPaymentMethod } from "./payment_method.model";
import { IInstallmentPlan } from "./installment_plan.model";
import { IFeeDetails } from "./fee-details.mode";

export interface ITransacao {
  id: string;                           // Identificador exclusivo para esta transação
  resource: string;                     // Value: transaction
  status: ETransacaoStatus;             // Indica o estado atual desta transação, por exemplo, reembolsado significa que o valor é totalmente reembolsado.
  amount: number;                       // Um número inteiro positivo em centavos que representa o quanto de carga, p. "1260" por US $ 12,60.
  original_amount: number;              // Um número inteiro positivo em centavos
  currency: string;                     // Um código de moeda com formato ISO 4217 de 3 letras
  description: string;                  // Uma seqüência arbitrária que você pode anexar a um objeto de transação
  payment_type: ETransacaoPaymentType;  // Métodos de pagamento aceitos. Os métodos de pagamento disponíveis podem variar de acordo com a localização.
  transaction_number: string;           // Este é o número da transação que aparece nos recibos de e-mail enviados para esta venda.
  refunds: Array<any>;                  // refund objects or null
  rewards: Array<any>;                  // Um identificador exclusivo para o objeto de recompensas associado
  discounts: string;                    // Um identificador exclusivo para o objeto de desconto associado.
  sales_receipt: string;                // Um identificador exclusivo para o objeto de recebimento associado.
  on_behalf_of: string;                 // Um identificador exclusivo de um objeto vendedor. Tanto os vendedores individuais ou comerciais dentro do seu mercado.
  customer: string;                     // Um identificador exclusivo de um vendedor ou um objeto comprador. Os clientes representam vendedores (indivíduos ou empresas) ou compradores dentro do mercado.
  statement_descriptor: string;         // Um descritor de declaração é o nome da empresa que aparece no extrato mensal do cartão de crédito do cliente. Permite que o cliente identifique rapidamente as transações reduzindo disputas e atendimento ao cliente.
  payment_method: IPaymentMethod;       // Um método de pagamento válido (cartão ou conta bancária).
  installment_plan: IInstallmentPlan;   // O plano permite aos compradores comprar produtos em até 12 parcelas em qualquer cartão de crédito, com ou sem taxas de juros.
  number_installments: number;          // O número de parcelas é organizado com o comprador no momento da compra.
  fees: number;                         // Um número inteiro positivo em centavos que representa a taxa total aplicada à transação.
  fee_details: IFeeDetails;             //
  location_latitute: string;            // A latitude em que ocorreu a transação
  location_longitude: string;           // A longitude em que ocorreu a transação
  metadata: any;
  expected_on: string;                  // W3C Datetime Format (yyyy-mm-ddThh:mm:ssZ) Retornar ao criar a transação como uma estimativa para quando o dinheiro estará disponível.
  created_at: string;                   // W3C Datetime Format para a criação de data (yyyy-mm-ddThh:mm:ssZ)
  updated_at: string;                   // W3C Datetime Format Para a última atualização (yyyy-mm-ddThh:mm:ssZ)
  uri: string;
}
