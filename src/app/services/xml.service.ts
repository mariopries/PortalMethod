import { Injectable } from "@angular/core";
import * as XML from "xml-js";
import { IPedidoVenda } from "../models/pedido-venda.model";
import { EFormaPagamento } from "../models/forma-pagamento.enum";
import { ETipoPessoa } from "../models/tipo-pessoa.enum";
import { MARKETPLACE_ID } from "../zoop/constants/marketplace_id.constant";
import { Produto } from "../classes/produto.class";
import { PedidoVenda } from "../classes/pedido-venda.class";

@Injectable({
  providedIn: "root"
})
export class XmlService {
  static parse(input: string): XML.ElementCompact {
    const result = XML.xml2js(input, {
      compact: true
    });
    return result;
  }

  static convert(xml: XML.ElementCompact) {
    for (const key in xml) {
      if (xml.hasOwnProperty(key)) {

        if (key === "_text") {
          const element = xml[key];
        }

      }
    }
  }

  static getPedido(pedido: any): PedidoVenda {
    const teste: IPedidoVenda = {
      Cliente: {
        Codigo: pedido.cliente.numero._text,
        Nome: pedido.cliente.nome._text,
        Documento: pedido.cliente.documento._text,
        Email: pedido.cliente.email._text,
        Endereco: pedido.cliente.endereco._text,
        FormasPagamento: this.getPagamentos(pedido.cliente.pagamento),
        TipoPessoa: pedido.cliente.documento._text.length === 11 ? ETipoPessoa.Fisica : ETipoPessoa.Juridica,
      },
      CodigoEmpresa: pedido.empresa.codigo._text ? pedido.empresa.codigo._text : MARKETPLACE_ID,
      Data: this.getData(pedido.data._text),
      Frete: Number.parseFloat(pedido.frete._text),
      Itens: this.getItens(pedido.item),
      Numero: pedido.numero._text
    };
    return new PedidoVenda(teste);
  }

  static getPagamentos(pagamentos: any): Array<EFormaPagamento> {
    const resultado = new Array<EFormaPagamento>();
    if (pagamentos.boleto._text === "S") {
      resultado.push(EFormaPagamento.Boleto);
    }
    if (pagamentos.credito._text === "S") {
      resultado.push(EFormaPagamento.CartaoCredito);
    }
    if (pagamentos.debito._text === "S") {
      resultado.push(EFormaPagamento.CartaoDebito);
    }
    return resultado;
  }

  static getData(dataIn: string) {
    const dataArray = dataIn.split("/");
    const dataNumbers = dataArray.map(texto => Number.parseInt(texto, 10));
    return new Date(dataNumbers[2], dataNumbers[1], dataNumbers[0]);
  }

  static getItens(itens: Array<any>): Array<Produto> {

    const resultado = new Array<Produto>();

    itens.forEach(item => {
      resultado.push(new Produto({
        Codigo: item.codigo._text,
        Descricao: item.descricao._text,
        Quantidade: Number.parseFloat(item.quantidade._text),
        UnidadeMedida: item.um._text,
        Valor: Number.parseFloat(item.unitario._text)
      }));
    });
    return resultado;
  }
}
