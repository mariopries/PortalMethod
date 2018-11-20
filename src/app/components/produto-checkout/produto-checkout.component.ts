import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/classes/produto.class';

@Component({
  selector: 'app-produto-checkout',
  templateUrl: './produto-checkout.component.html',
  styleUrls: ['./produto-checkout.component.css']
})
export class ProdutoCheckoutComponent implements OnInit {

  @Input() produto: Produto;

  constructor() { }

  ngOnInit() {
  }

}
