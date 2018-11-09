export interface IPaymentMethod {

  expiration_date?:   string;         // Data de vencimento utilizado nas vendas por boleto
  top_instructions?:  Array<string>;  // Instruções para o comprador utilizado nas vendas por boleto

}
