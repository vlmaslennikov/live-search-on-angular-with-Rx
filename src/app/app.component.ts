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
    this.results.length = 0;
  }

  ngOnDestroy(){
    this.observable.unsubscribe();
  }
}
