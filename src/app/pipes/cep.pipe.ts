import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cep"
})
export class CepPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
    return value;
  }
}
