import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numero"
})
export class NumeroPipe implements PipeTransform {
  transform(value: string | number, args?: any): any {
    if (typeof value === "string") {
      value = value.replace(",", "");
      value = value.replace(".", ",");
      let ints = value.split(",")[0];
      const decs = value.split(",")[1];
      ints = ints.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `${ints},${decs}`;
    }
  }
}
