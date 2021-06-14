import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription, iif, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  tap,
  mergeMap,
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
    this.results.length = 0;
    this.observable = fromEvent(this.searchArea.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        mergeMap((val: any) =>
          iif(
            () => val == '',
            of(val).pipe(
              tap(() => {
                this.results.length = 0;
              })
            ),
            of(val).pipe(
              debounceTime(500),
              map((val: any) => val.trim()),
              distinctUntilChanged(),
              tap((a: any) => {
                this.results = this.server.resultsFilter(a as string);
              })
            )
          )
        )
      )
      .subscribe();
  }

  insertValue(value: string) {
    this.inputValue = value;
  }

  selectResult(value: string) {
    this.inputValue = value;
    this.searchArea.nativeElement.focus();
    this.results.length = 0;
  }

  ngOnDestroy() {
    this.observable.unsubscribe();
  }
}
