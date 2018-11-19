import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cnpj"
})
export class CnpjPipe implements PipeTransform {
  transform(value: any): any {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value;
  }
}
