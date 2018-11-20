import { ETipoPessoa } from "./tipo-pessoa.enum";
import { EFormaPagamento } from "./forma-pagamento.enum";

export interface ICliente {
  Nome: string;
  FormasPagamento: Array<EFormaPagamento>; // TODO Corrigir
  TipoPessoa: ETipoPessoa;
  Codigo: string;
  Documento: string;
  Email: string;
  Endereco: string;
}
