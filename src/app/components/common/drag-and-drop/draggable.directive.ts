import { DragService } from './drag.service';
import { Directive, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[myDraggable]'
})
export class DraggableDirective {
  constructor(private dragService: DragService) {
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @Input()
  set myDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  private options: DraggableOptions = {};

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { zone = 'zone', data = {} } = this.options;

    this.dragService.startDrag(zone);

    event.dataTransfer.setData('Text', JSON.stringify(data));
  }
}
export interface DraggableOptions {
  zone?: string;
  data?: any;
}