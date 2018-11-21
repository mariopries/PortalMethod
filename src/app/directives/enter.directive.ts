import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEnter]'
})
export class EnterDirective {

  constructor(private er: ElementRef) { }

  @HostListener('keyup', ['$event'])
  onEnter(event) {
    // event.preventDefault();
    console.log(this.er.nativeElement);
    if (event.keyCode === 13) {
      // this.er.nativeElement.;
    }
  }

}
