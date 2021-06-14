import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputKeydownArrowsDirective } from './directives/input-keydown-arrows.directive';
import { UlKeydownArrowsDirective } from './directives/ul-keydown-arrows.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputKeydownArrowsDirective,
    UlKeydownArrowsDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
