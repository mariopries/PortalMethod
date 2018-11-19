import { Directive, HostListener, ElementRef, forwardRef, AfterViewInit } from "@angular/core";
import { CpfPipe } from "../pipes/cpf.pipe";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

const noop = () => {};

@Directive({
  selector: "[appCpf]",
})
export class CpfDirective implements AfterViewInit {
  private el: HTMLInputElement;

  constructor(er: ElementRef, private cpfPipe: CpfPipe) {
    this.el = er.nativeElement;
  }

  @HostListener('input')
  onInput() {
    this.el.value = this.cpfPipe.transform(this.el.value);
  }

  @HostListener('keypress', ["$event"])
  onKeyPress(event) {
    const key = event.keyCode || 0;
    if ((key < 96 || key > 105) && (key < 48 || key > 57)) {
      event.preventDefault();
    }
  }


  ngAfterViewInit() {

  }

}
