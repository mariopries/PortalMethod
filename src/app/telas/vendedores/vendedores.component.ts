import { Component, OnInit } from "@angular/core";
import { Vendedor } from "src/app/zoop/class/vendedor/vendedor.class";
import { IIndividuo, IEmpresa } from "src/app/zoop/class/vendedor/models/vendedor.model";
import { EVendedorStatus } from "src/app/zoop/enums/vendedor.status.enum";
import { EVendedorType } from "src/app/zoop/enums/vendedor.type.enum";

@Component({
  selector: "app-vendedores",
  templateUrl: "./vendedores.component.html",
  styleUrls: ["./vendedores.component.css"]
})
export class VendedoresComponent implements OnInit {
  vendedor: Vendedor;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  public async init() {

    // this.vendedor = <IIndividuo>{
    //   first_name: "Lula"
    // };
    // console.log(this.vendedor);
    //this.vendedor = await Vendedor.BuscaVendedor("07400221990", this.vendedor).toPromise();

    // this.vendedor = new Vendedor(<IIndividuo>{
    //   status: EVendedorStatus.enabled,
    //   resource: "seller",
    //   first_name: "Mario",
    //   last_name: "Pries Junior",
    //   email: "mario.pries@methodinformatica.com.br",
    //   taxpayer_id: "07400221990"
    // });

    this.vendedor = <IIndividuo>{
      status: EVendedorStatus.enabled,
      resource: "seller",
      first_name: "Mario",
      last_name: "Pries Junior",
      email: "mario.pries@methodinformatica.com.br",
      taxpayer_id: "07400221990"
    };
    
    //if (this.vendedor.type === EVendedorType.individual) {
      this.vendedor = await Vendedor
      .CriarVendedorIndividuo(this.vendedor)
      .toPromise();
    //}
    console.log(this.vendedor);

  }
}
