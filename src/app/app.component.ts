import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  tap,
} from 'rxjs/operators';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ServerService],
})
export class AppComponent {
  @ViewChild('searchArea') searchArea!: ElementRef;

  inputValue!: string;
  results: string[] = [];
  observable!: Subscription;

  constructor(private server: ServerService) {}

  ngAfterViewInit() {
    if (this.observable) this.observable.unsubscribe();
    this.observable = fromEvent(this.searchArea.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        debounceTime(1500),
        map((val: any) => val.trim()),
        distinctUntilChanged(),
        tap((a: any) => (this.results = this.server.resultsFilter(a as string)))
      )
      .subscribe();
  }

  selectResult(value: string) {
    this.observable.unsubscribe();
    this.inputValue = value;
    this.searchArea.nativeElement.focus()
    this.results.length = 0;
  }

  goToCoincidences(coincidences:any){
    console.log('coincidences',coincidences);
  }

  ngOnDestroy(){
    this.observable.unsubscribe();
  }

  arrowDown(event:any){
    event.target.classList.remove('selected');
    event.target.removeEventListener('mouseover',this.addFocus)

    if(event.target !== event.target.parentElement.lastElementChild){

      this.inputValue = event.target.nextSibling.value;

      event.target.nextSibling.classList.add('selected');
      event.target.nextSibling.focus();
      console.log('event.target.parentElement.firstElementChild',event.target.parentElement.firstElementChild);
    }else{
      this.inputValue = event.target.parentElement.firstElementChild.value;
      event.target.parentElement.firstElementChild.classList.add('selected');
      event.target.parentElement.firstChild.focus();
    }
  }

  arrowUp(event:any){
    event.target.removeEventListener('mouseover',this.addFocus)

    event.target.classList.remove('selected');
    if(event.target !== event.target.parentElement.firstElementChild){
      
      this.inputValue = event.target.previousSibling.value;

      event.target.previousSibling.classList.add('selected');
      event.target.previousSibling.focus();
      console.log('event.target.parentElement.firstElementChild',event.target.parentElement.firstElementChild);
    }else{
      this.inputValue = event.target.parentElement.lastElementChild.value;
      event.target.parentElement.lastElementChild.classList.add('selected');
      event.target.parentElement.lastElementChild.focus();
    }
  }

  addFocus(event:any){
    event.target.parentElement.childNodes.forEach((el:any)=> {
      if(el.classList?.contains('selected')) el.classList.remove('selected');
    });
    event.target.classList.add('selected');
    event.target.focus();
    
  }

}

