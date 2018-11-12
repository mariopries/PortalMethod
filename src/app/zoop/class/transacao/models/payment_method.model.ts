export interface IPaymentMethod {
  expiration_date?: string;         // Data de vencimento utilizado nas vendas por boleto
  top_instructions?: [string, string]; // Instruções para o comprador utilizado nas vendas por boleto
  accepted?: boolean;
  barcode: string;
  created_at: string;
  customer: string;
  description: string;
  document_number: string;
  downloaded: boolean;
  fingerprint: string;
  id: string;
  metadata: any;
  paid_at: string;
  printed: boolean;
  recipient: string;
  reference_number: string;
  source: string;
  sequence: string;
  updated_at: string;
  uri: string;
  url: string;
}
