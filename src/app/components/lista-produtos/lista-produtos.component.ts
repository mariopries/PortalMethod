import { Component, OnInit, Input } from '@angular/core';
import { Mock } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  @Input()
  produtos = Mock.Produtos(10);
  public precoTotal = 0;

  constructor() { }

  ngOnInit() {
    let resultado = 0;
    this.produtos.forEach(produto => {
      resultado += produto.Total * 100;
    });

  //   this.produtos.push({
  //   name: "Palito de bambu 4x10cm sabor menta",
  //   preco: Math.random() * 10,
  //   quantidade: Math.floor(Math.random() * 100)
  // });
  // for (let index = 0; index < 30; index++) {
  //   this.produtos.push({
  //     name: this.getName(),
  //     preco: Math.random() * 10,
  //     quantidade: Math.floor(Math.random() * 100)
  //   });
  // }
  //   let resultado = 0;
  //   this.produtos.forEach(produto => {
  //     resultado += produto.preco * 100 * produto.quantidade;
  //   });
    this.precoTotal = resultado;
  }
  public getName() {
    const index = Math.floor(Math.random() * 9);
    const names = [
      "tomato",
      "potato",
      "cucumber",
      "carrot",
      "onion",
      "broccoli",
      "cabbage",
      "spinach",
      "lettuce",
      "pea",
      "kale",
      "radish",
      "celery",
      "beet",
      "eggplant",
      "garlic",
      "zucchini",
      "bell pepper",
      "turnip",
      "corn",
      "parsnip",
      "okra",
      "scallion",
      "asparagus",
      "leek",
      "green bean",
      "shallot",
      "cauliflower",
      "rutabaga",
      "watercress",
      "kohlrabi",
      "endive",
      "artichoke",
      "bean"
    ];
    return names[index];
  }
}
