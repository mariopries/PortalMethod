import { CpfPipe } from './../../pipes/cpf.pipe';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorFn, FormControl, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { validaCPF, validaCNPJ } from 'src/app/util/functions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomValidator {

  static cpfValido = () => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = validaCPF(CpfPipe.prototype.parse(control.value));
      return isValid ? null : { 'cpfInvalido': {
        value: control.value
      } };
    };
  }

  static cnpjInvalido: ValidatorFn = (control: FormControl) => {
    const c = new CpfPipe();
    const isValid = validaCNPJ(c.parse(control.value));
    return isValid ? null : { 'cnpjInvalido': true };
  }

}
