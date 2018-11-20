import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-boleto-form",
  templateUrl: "./boleto-form.component.html",
  styleUrls: ["./boleto-form.component.css"]
})
export class BoletoFormComponent implements OnInit {
  @Input()
  boleto: FormGroup;

  constructor() {}

  ngOnInit() {
  }
}
