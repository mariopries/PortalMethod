import { IPedidoVenda } from "../models/pedido-venda.model";
import { Cliente } from "./cliente.class";
import { Produto } from "./produto.class";

export class PedidoVenda implements IPedidoVenda {
  public CodigoEmpresa: string;  Numero: string;
  public Data: Date;
  public Cliente: Cliente;
  public Frete: number;
  public Itens: Produto[];

  constructor(pedidoVenda: IPedidoVenda) {
    this.CodigoEmpresa = pedidoVenda.CodigoEmpresa;
    this.Data = pedidoVenda.Data;
    this.Cliente = pedidoVenda.Cliente;
    this.Frete = pedidoVenda.Frete;
    this.Itens = pedidoVenda.Itens;
  }

}
