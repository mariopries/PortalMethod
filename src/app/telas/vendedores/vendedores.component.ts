import { Component, OnInit } from "@angular/core";
import { Vendedor } from "src/app/zoop/class/vendedor/vendedor.class";
import { IVendedor } from "src/app/zoop/class/vendedor/models/vendedor.model";
import { EVendedorStatus } from "src/app/zoop/enums/vendedor.status.enum";
import { EVendedorType } from "src/app/zoop/enums/vendedor.type.enum";

@Component({
  selector: "app-vendedores",
  templateUrl: "./vendedores.component.html",
  styleUrls: ["./vendedores.component.css"]
})
export class VendedoresComponent implements OnInit {
  vendedorTipoIndividuo: IVendedor;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  public async init() {
    const vendedor = new Vendedor();
    this.vendedorTipoIndividuo = <IVendedor>{
      status: EVendedorStatus.enabled,
      resource: "seller",
      type: EVendedorType.individual,
      first_name: "Testes",
      last_name: "Da Silva",
      email: "testes1@testes.com",
      taxpayer_id: "40749389010"
    };
    this.vendedorTipoIndividuo = await vendedor
      .CriarNovoVendedor(this.vendedorTipoIndividuo)
      .toPromise();

    console.log(this.vendedorTipoIndividuo);

    //this.transaction(); // fiz mas não testei (mario)
  }
}
