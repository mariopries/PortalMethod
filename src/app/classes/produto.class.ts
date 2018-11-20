import { IProduto } from "../models/produto.model";
import * as XML from "xml-js";

export class Produto implements IProduto {
  public Codigo: string;
  public Descricao: string;
  public Valor: number;
  public Quantidade: number;
  public UnidadeMedida: string;
  private total: number;

  constructor(produto: IProduto) {
    this.Codigo = produto.Codigo;
    this.Descricao = produto.Descricao;
    this.Valor = produto.Valor;
    this.Quantidade = produto.Quantidade;
    this.UnidadeMedida = produto.UnidadeMedida;
    this.total = this.Valor * this.Quantidade;
  }

  get Total() {
    return this.total;
  }

}
