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

  @Input('crEdgeResize')
  hc = 'red';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', 'auto');
    const row = this.elementRef.nativeElement.querySelector('tr');
    const cols = row.children;

    for (const col of cols) {
      this.renderer.setStyle(col, 'position', 'relative');
      const div = this.createDiv();
      this.renderer.appendChild(col, div);

      this.renderer.listen(div, 'mousedown', (e) => {
        this.curCol = e.target.parentElement;
        this.nxtCol = this.curCol.nextElementSibling;
        this.pageX = e.pageX;
        this.curColWidth = this.curCol.offsetWidth

        if (this.nxtCol) {
          this.nxtColWidth = this.nxtCol.offsetWidth
        }
      });

      this.renderer.listen(div, 'mouseover', (e) => {
        this.renderer.setStyle(div, 'background-color', this.hc);
      });

      this.renderer.listen(div, 'mouseleave', (e) => {
        this.renderer.removeStyle(div, 'background-color');
      });
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (this.curCol) {
      const diffX = e.pageX - this.pageX;

      if (this.nxtCol) {
        this.renderer.setStyle(this.nxtCol, 'width', (this.nxtColWidth - (diffX))+'px')
      }

      this.renderer.setStyle(this.curCol, 'width', (this.curColWidth + diffX)+'px')
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.curCol = null;
    this.nxtCol = null;
    this.pageX = null;
    this.nxtColWidth = null;
    this.curColWidth = null;
  }

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
