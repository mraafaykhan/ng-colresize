import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[crCornerResize]'
})
export class CornerResizeDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    // Get first row of the table
    const row = this.elementRef.nativeElement.querySelector('tr');

    // Iterate throuhg all the th elements of the row
    for (const child of row.children) {

      // Dynamically create a div element which can be resized
      const div = this.renderer.createElement('div');
      this.renderer.setStyle(div, 'resize', 'horizontal');
      this.renderer.setStyle(div, 'overflow', 'hidden');

      // Take all inner html of th element and insert it into the newly created div
      const content = child.innerHTML;
      this.renderer.appendChild(div, this.renderer.createText(content));

      // Remove the contents of the th element
      child.innerHTML = '';

      // Insert the created div into the th element
      this.renderer.appendChild(child, div);
    }
  }
}
