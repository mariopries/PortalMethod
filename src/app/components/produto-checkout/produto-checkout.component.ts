import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-produto-checkout',
  templateUrl: './produto-checkout.component.html',
  styleUrls: ['./produto-checkout.component.css']
})
export class ProdutoCheckoutComponent implements OnInit {

  @Input() produto: {
    name: string,
    preco: number,
    quantidade: number
  };

  constructor() { }

  ngOnInit() {
  }

}
