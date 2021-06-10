import { Component} from '@angular/core';
import { ServerService } from './services/server.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ServerService]
})
export class AppComponent {
  inputValue!:string;
  constructor(
    private server:ServerService
  ){}
  results:string[]=[];

  selectResult(value:string){
    this.inputValue=value;
    this.results.length=0;
    this.server.afterSelect();
  }
  enterValue(value:string){
    this.server.resultsFilter(value);
    this.results=this.server.coincidences
  }
}
