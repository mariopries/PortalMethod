import { Component, OnInit } from "@angular/core";
import { IEmpresa, IIndividuo } from "src/app/zoop/class/vendedor/models/vendedor.model";
import { Vendedor } from "src/app/zoop/class/vendedor/vendedor.class";
import { EVendedorStatus } from "src/app/zoop/enums/vendedor.status.enum";
import * as CPF from "@fnando/cpf";

@Component({
  selector: "app-vendedores",
  templateUrl: "./vendedores.component.html",
  styleUrls: ["./vendedores.component.css"]
})
export class VendedoresComponent implements OnInit {
  vendedor: Vendedor<IEmpresa | IIndividuo>;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  public async init() {
    const cpf = "07400221990"; // CPF.generate();

    // const vendedores = await Vendedor.ListaVendedores();

    // console.log(vendedores);

    // if (vendedores.map(vendedor => vendedor.taxpayer_id).includes(cpf)) {
    //   console.log("Existe");
    // } else {
    //   console.log("Não existe");
    // }

    console.log(this.vendedor);
    this.vendedor = new Vendedor<IIndividuo>();
    this.vendedor = await Vendedor.BuscaVendedor(cpf, this.vendedor);

    // if (!this.vendedor) {
    //   this.vendedor = new Vendedor(<IIndividuo>{
    //     status: EVendedorStatus.enabled,
    //     resource: "seller",
    //     first_name: "Mario",
    //     last_name: "Pries Junior",
    //     email: "mario.pries@methodinformatica.com.br",
    //     taxpayer_id: cpf
    //   });
    // }

    // this.vendedor = new Vendedor(<IIndividuo>{
    //   status: EVendedorStatus.enabled,
    //   resource: "seller",
    //   first_name: "Mario",
    //   last_name: "Pries Junior",
    //   email: "mario.pries@methodinformatica.com.br",
    //   taxpayer_id: "07400221990"
    // });
    // this.vendedor = new Vendedor(<IIndividuo>{
    //   status: EVendedorStatus.enabled,
    //   resource: "seller",
    //   first_name: "Mario",
    //   last_name: "Pries Junior",
    //   email: "mario.pries@methodinformatica.com.br",
    //   taxpayer_id: CPF.generate()
    // });

    // // if (this.vendedor.type === EVendedorType.individual) {
    //   const vendedor = await Vendedor
    //   .CriarVendedorIndividuo(this.vendedor)
    //   .toPromise();
    // // }
    console.log(this.vendedor);
  }
}
