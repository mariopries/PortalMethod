import { Cliente } from "../classes/cliente.class";
import { Produto } from "../classes/produto.class";

export interface IPedidoVenda {
  CodigoEmpresa: string;
  Numero: string;
  Data: Date;
  Cliente: Cliente;
  Frete: number;
  Itens: Array<Produto>;
}
