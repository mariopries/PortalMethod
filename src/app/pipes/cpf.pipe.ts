import { Pipe, PipeTransform } from "@angular/core";
import { removeNonDigits, isString, formatCpf } from "../util/functions";

@Pipe({
  name: "cpf"
})
export class CpfPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return null;
    }
    let result: string;
    result = value.replace(/\D/g, "");
    result = result.replace(/(\d{3})(\d)/, "$1.$2");
    result = result.replace(/(\d{3})(\d)/, "$1.$2");
    result = result.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return result;
  }

  parse(value: string): string {
    if (!value) {
      return null;
    }
    const result = value.replace('.', '').replace('-', '');
    return result;
  }
}
