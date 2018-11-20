import { ICliente } from "../models/cliente.model";
import { EFormaPagamento } from "../models/forma-pagamento.enum";
import { ETipoPessoa } from "../models/tipo-pessoa.enum";

export class Cliente implements ICliente {
  public Nome: string;
  public FormasPagamento: EFormaPagamento[];
  public TipoPessoa: ETipoPessoa;
  public Codigo: string;
  public Documento: string;
  public Email: string;
  public Endereco: string;

  constructor(cliente: ICliente) {
    this.Nome = cliente.Nome;
    this.FormasPagamento = cliente.FormasPagamento;
    this.TipoPessoa = cliente.TipoPessoa;
    this.Codigo = cliente.Codigo;
    this.Documento = cliente.Documento;
    this.Email = cliente.Email;
    this.Endereco = cliente.Endereco;
  }

}
