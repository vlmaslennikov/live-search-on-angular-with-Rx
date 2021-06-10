import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';


@Injectable()
export class ServerService {
  values:string[]=[
    '1','12','123','qewrty'
  ]

  coincidences!:string[];

  observable!:any;

  resultsFilter(inputValue:string){
    this.observable=of(inputValue).pipe(
      map((val:string) => this.values.filter(el =>el===val)),
      debounceTime(500),
      tap(c=>this.coincidences = c)
    ).subscribe()
  }

  afterSelect(){
    this.observable.unsubscribe()
  }
}
