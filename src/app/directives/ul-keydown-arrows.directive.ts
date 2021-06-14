import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUlKeydownArrows]',
})
export class UlKeydownArrowsDirective {
  @Output() setValue: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('keydown.arrowdown', ['$event.target']) arrowDown(
    event: EventTarget
  ):void {
    let eventTarget = event as any;
    eventTarget.classList.remove('selected');
    eventTarget.removeEventListener('mouseover', this.addFocus);
    if (eventTarget != eventTarget?.parentElement.lastElementChild) {
      this.setValue.emit(eventTarget.nextSibling.value);
      eventTarget.nextSibling.classList.add('selected');
      eventTarget.nextSibling.focus();
    } else {
      this.setValue.emit(eventTarget.parentElement.firstElementChild.value);
      eventTarget.parentElement.firstElementChild.classList.add('selected');
      eventTarget.parentElement.firstChild.focus();
    }
  }

  @HostListener('keydown.arrowup', ['$event.target']) arrowUp(
    event: EventTarget
  ):void {
    let eventTarget = event as any;
    eventTarget.removeEventListener('mouseover', this.addFocus);
    eventTarget.classList.remove('selected');
    if (eventTarget !== eventTarget.parentElement.firstElementChild) {
      this.setValue.emit(eventTarget.previousSibling.value);
      eventTarget.previousSibling.classList.add('selected');
      eventTarget.previousSibling.focus();
    } else {
      this.setValue.emit(eventTarget.parentElement.lastElementChild.value);
      eventTarget.parentElement.lastElementChild.classList.add('selected');
      eventTarget.parentElement.lastElementChild.focus();
    }
  }

  @HostListener('mouseover', ['$event.target']) addFocus(event: EventTarget):void {
    let eventTarget = event as any;
    eventTarget.parentElement.childNodes.forEach((el: any) => {
      if (el?.classList?.contains('selected')) el.classList.remove('selected');
    });
    eventTarget.classList.add('selected');
    eventTarget.focus();
  }
}
