import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUlKeydownArrows]',
})
export class UlKeydownArrowsDirective {
  @Output() setValue: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('keydown.arrowdown', ['$event']) arrowDown(event: any) {
    event.target.classList.remove('selected');
    event.target.removeEventListener('mouseover', this.addFocus);
    if (event.target !== event.target.parentElement.lastElementChild) {
      this.setValue.emit(event.target.nextSibling.value);
      event.target.nextSibling.classList.add('selected');
      event.target.nextSibling.focus();
      console.log(
        'event.target.parentElement.firstElementChild',
        event.target.parentElement.firstElementChild
      );
    } else {
      this.setValue.emit(event.target.parentElement.firstElementChild.value);
      event.target.parentElement.firstElementChild.classList.add('selected');
      event.target.parentElement.firstChild.focus();
    }
  }

  @HostListener('keydown.arrowup', ['$event']) arrowUp(event: any) {
    event.target.removeEventListener('mouseover', this.addFocus);
    event.target.classList.remove('selected');
    if (event.target !== event.target.parentElement.firstElementChild) {
      this.setValue.emit(event.target.previousSibling.value);
      event.target.previousSibling.classList.add('selected');
      event.target.previousSibling.focus();
      console.log(
        'event.target.parentElement.firstElementChild',
        event.target.parentElement.firstElementChild
      );
    } else {
      this.setValue.emit(event.target.parentElement.lastElementChild.value);
      event.target.parentElement.lastElementChild.classList.add('selected');
      event.target.parentElement.lastElementChild.focus();
    }
  }

  @HostListener('mouseover', ['$event']) addFocus(event: any) {
    event.target.parentElement.childNodes.forEach((el: any) => {
      if (el?.classList?.contains('selected')) el.classList.remove('selected');
    });
    event.target.classList.add('selected');
    event.target.focus();
  }
}
