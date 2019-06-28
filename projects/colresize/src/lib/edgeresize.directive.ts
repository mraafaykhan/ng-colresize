import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[crEdgeResize]'
})
export class EdgeResizeDirective implements AfterViewInit {
  private pageX = null;
  private curCol = null;
  private nxtCol = null;
  private curColWidth = null;
  private nxtColWidth = null;

  // Assign the default highlight color
  @Input('crEdgeResize')
  hc = 'red';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', 'auto');

    // Get first row of table and assign the child th elements to cols variable
    const row = this.elementRef.nativeElement.querySelector('tr');
    const cols = row.children;

    // Iterate through all th elements
    for (const col of cols) {
      this.renderer.setStyle(col, 'position', 'relative');
      const div = this.createDiv();
      this.renderer.appendChild(col, div);

      // Assign values to class variables in the mousedown event
      this.renderer.listen(div, 'mousedown', (e) => {

        // Select the parent th element of the created div
        this.curCol = e.target.parentElement;
        // Select the next sibling th element
        this.nxtCol = this.curCol.nextElementSibling;
        this.pageX = e.pageX;
        this.curColWidth = this.curCol.offsetWidth;

        if (this.nxtCol) {
          this.nxtColWidth = this.nxtCol.offsetWidth;
        }
      });

      // Register mouseover and mouseleave events for highlighting
      this.renderer.listen(div, 'mouseover', (e) => {
        this.renderer.setStyle(div, 'background-color', this.hc);
      });

      this.renderer.listen(div, 'mouseleave', (e) => {
        this.renderer.removeStyle(div, 'background-color');
      });
    }
  }

  // Register the mousemove to adjust the col widths
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    // Check if the mousedown event occured
    if (this.curCol) {
      // Calculate the difference between the curr x position and the one saved from the mousedown event
      const diffX = e.pageX - this.pageX;

      // If a sibling th is present then subtract its width by the difference calculated
      if (this.nxtCol) {
        this.renderer.setStyle(this.nxtCol, 'width', (this.nxtColWidth - (diffX)) + 'px');
      }

      // Similary increase the width of the current selected th element
      this.renderer.setStyle(this.curCol, 'width', (this.curColWidth + diffX) + 'px');
    }
  }

  // When the mouse is go then dereference all the class variables
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.curCol = null;
    this.nxtCol = null;
    this.pageX = null;
    this.nxtColWidth = null;
    this.curColWidth = null;
  }

  // Helper function to create a div that acts as handle to adjust width
  createDiv() {
    const div = this.renderer.createElement('div');

    this.renderer.addClass(div, 'columnSelector');
    this.renderer.setStyle(div, 'top', 0);
    this.renderer.setStyle(div, 'right', 0);
    this.renderer.setStyle(div, 'width', '5px');
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'cursor', 'col-resize');
    // this.renderer.setStyle(div, 'background-color', 'red');
    this.renderer.setStyle(div, 'height', this.elementRef.nativeElement.offsetHeight + 'px');

    return div;
  }

}
