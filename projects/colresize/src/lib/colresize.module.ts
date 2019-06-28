import { NgModule } from '@angular/core';
import { ColresizeComponent } from './colresize.component';
import { CornerResizeDirective } from './corner-resize.directive';
import { EdgeResizeDirective } from './edgeresize.directive';

@NgModule({
  declarations: [
    ColresizeComponent,
    CornerResizeDirective,
    EdgeResizeDirective
  ],
  imports: [
  ],
  exports: [
    ColresizeComponent,
    CornerResizeDirective
  ]
})
export class ColresizeModule { }
