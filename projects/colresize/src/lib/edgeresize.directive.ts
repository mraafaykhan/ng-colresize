import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[crEdgeResize]'
})
export class EdgeResizeDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    // this.elementRef.nativeElement.offset
  }
}
