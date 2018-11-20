import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CpfPipe } from "src/app/pipes/cpf.pipe";
import { validaCPF } from "src/app/util/functions";

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
