import { Component, OnInit, AfterViewInit, Output, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICardJS } from "src/app/cardJS/interfaces/card.cardjs.model";

declare var Card: any;

@Component({
  selector: "app-cartao-credito-form",
  templateUrl: "./cartao-credito-form.component.html",
  styleUrls: ["./cartao-credito-form.component.css"]
})

export class CartaoCreditoFormComponent implements OnInit, AfterViewInit {
  @Input() cartaoCredito: FormGroup;
  constructor(fb: FormBuilder) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const cardTeste = new Card(<ICardJS>{
      form: "form",
      container: "app-cartao-credito",
      debug: true,
      formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
      }
    });
  }
}
