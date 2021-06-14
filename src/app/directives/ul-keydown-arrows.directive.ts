import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUlKeydownArrows]'
})
export class UlKeydownArrowsDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }

  @HostListener('keydown.arrowdown') arrowDown(){
      this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling.firstChild, 'selected');
      this.elementRef.nativeElement.nextElementSibling.firstChild.focus();
  }

  @HostListener('keydown.arrowup') arrowUp(){
      this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling.lastElementChild, 'selected');
      this.elementRef.nativeElement.nextElementSibling.lastElementChild.focus();
  }

}
