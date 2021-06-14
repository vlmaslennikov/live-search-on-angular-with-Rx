import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputKeydownArrows]'
})
export class InputKeydownArrowsDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}
    @HostListener('keydown.arrowdown') arrowDown(){
      if (this.elementRef.nativeElement.nextElementSibling.childElementCount!==0) {
        this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling.firstChild, 'selected');
        this.elementRef.nativeElement.nextElementSibling.firstChild.focus();
      }
    }

    @HostListener('keydown.arrowup') arrowUp(){
      if (this.elementRef.nativeElement.nextElementSibling.childElementCount!==0) {
        this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling.lastElementChild, 'selected');
        this.elementRef.nativeElement.nextElementSibling.lastElementChild.focus();
      }
    }

}
