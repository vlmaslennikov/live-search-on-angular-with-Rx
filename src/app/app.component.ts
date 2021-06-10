import { Component,} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputValue!:string;
  constructor(){}
  results:string[]=[];

  selectResult(value:string){
    this.inputValue=value;
  }
  enterValue(value:string){
  }
}
