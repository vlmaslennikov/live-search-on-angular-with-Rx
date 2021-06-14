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
        debounceTime(500),
        mergeMap((val) =>
          iif(
            () => val == '',
            of(val).pipe(
              tap(() => {
                this.results.length = 0;
              })
            ),
            of(val).pipe(
              map((val: any) => val.trim()),
              distinctUntilChanged(),
              tap((val) => {
                this.results = this.server.resultsFilter(val as string);
              })
            )
          )
        )
      )
      .subscribe();
  }

  insertValue(value: string): void {
    this.inputValue = value;
  }

  selectResult(value: string): void {
    this.inputValue = value;
    this.searchArea.nativeElement.focus();
    this.results.length = 0;
  }

  ngOnDestroy(): void {
    this.observable.unsubscribe();
  }
}
