import { Injectable } from '@angular/core';
import { Produto } from '../classes/produto.class';
import { Md5 } from "ts-md5";

@Injectable({
  providedIn: 'root'
})
export class Mock {

  static Produtos(amount: number): Array<Produto> {
    const produtos = new Array<Produto>();
    for (let index = 0; index < amount; index++) {
      const nome = Md5.hashStr(Math.random().toString()).toString();
      produtos.push(new Produto({
        Codigo: nome,
        Descricao: "Produto " + nome,
        Quantidade: Math.floor( Math.random() * 10 ) + 1,
        UnidadeMedida: 'UN',
        Valor: Math.floor( Math.random() * 10 ) + 1
      }));
    }

    return produtos;
  }

}
