import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ColresizeModule } from 'colresize';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ColresizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
