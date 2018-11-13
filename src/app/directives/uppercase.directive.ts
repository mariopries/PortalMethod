import { Directive, ElementRef, HostListener } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener("input") onInput() {
    this.el.nativeElement.value = UpperCasePipe.prototype.transform(this.el.nativeElement.value);
  }

}
