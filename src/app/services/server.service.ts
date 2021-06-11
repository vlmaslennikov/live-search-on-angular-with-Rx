import { Injectable } from '@angular/core';


@Injectable()
export class ServerService {
  values:string[]=[
    '1','12','123','qewrty'
  ]

  coincidences!:string[];


  resultsFilter(inputValue:string){
     return this.values.filter(el =>el.startsWith(inputValue))
  }

  
}
