import {
  Directive,
  HostListener,
  ElementRef,
  forwardRef,
  AfterViewInit,
  Renderer,
  Renderer2,
  Input
} from "@angular/core";
import { CpfPipe } from "../pipes/cpf.pipe";
import {
  NG_VALUE_ACCESSOR,
  FormControl,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  NG_VALIDATORS
} from "@angular/forms";
import { validaCPF } from "../util/functions";
import { CustomValidator } from "../modules/custom-validator/custom-validator.module";

const noop = () => {};

@Directive({
  selector: "[appCpf]",
})
export class CpfDirective implements ControlValueAccessor {
  private el: HTMLInputElement;
  registerOnChange;
  registerOnTouched;
  writeValue;
  public onChange = (_: any) => {};
  public onTouched = () => {};

  constructor(
    private er: ElementRef,
    private cpfPipe: CpfPipe
  ) {
    this.el = er.nativeElement;
  }

  @HostListener("input")
  onInput() {
    this.el.value = this.cpfPipe.transform(this.el.value);
  }

  @HostListener("keypress", ["$event"])
  onKeyPress(event) {
    const key = event.keyCode || 0;
    if ((key < 96 || key > 105) && (key < 48 || key > 57)) {
      event.preventDefault();
    }
  }

  @HostListener("blur", ["$event", "$scope"])
  onblur(event, value) {
  }
}
