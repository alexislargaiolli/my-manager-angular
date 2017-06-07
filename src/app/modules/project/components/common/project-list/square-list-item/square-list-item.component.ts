import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, HostBinding, ViewChild, ElementRef, Renderer, Renderer2, EventEmitter, Output } from '@angular/core';
import { Project } from 'app/models';
import { listItemStateAnimation } from './square-list-item.animation';
import { style, animate, group, AnimationBuilder } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './square-list-item.component.html',
  styleUrls: ['./square-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listItemStateAnimation]
})
export class SquareListItemComponent implements OnInit {

  @ViewChild('selectedContainer')
  private _selectedContainer: ElementRef;

  @ViewChild('itemContent')
  private _itemContent: ElementRef;

  @Input()
  selected: boolean = null;

  @Output()
  selectionEnds: EventEmitter<any> = new EventEmitter<any>();

  private _state: string = 'inactive';

  constructor(private _router: Router, private _el: ElementRef, private _renderer: Renderer2, private _builder: AnimationBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._state !== 'hide' && this._state !== 'selected') {
      if (this.selected === true) {
        this._state = 'selected';
      }
      else if (this.selected === false) {
        this._state = 'hide';
      }
    }
  }

  @HostListener('mouseenter') mouseEnter() {
    if (this._state !== 'hide' && this._state !== 'selected') {
      this._state = 'hover';
    }
  }

  @HostListener('mouseleave') mouseLeave() {
    if (this._state !== 'hide' && this._state !== 'selected') {
      this._state = 'inactive';
    }
  }

  @HostListener('click') click() {
    const top = this._el.nativeElement.offsetTop;
    const left = this._el.nativeElement.offsetLeft;
    const currentWidth = this._el.nativeElement.offsetWidth;
    const currentHeight = this._el.nativeElement.offsetHeight;
    const finalTop = this._el.nativeElement.parentElement.parentElement.offsetTop;
    const finalLeft = this._el.nativeElement.parentElement.parentElement.offsetLeft;
    const finalWidth = this._el.nativeElement.parentElement.parentElement.offsetWidth;
    const finalHeight = this._el.nativeElement.parentElement.parentElement.offsetHeight;

    const transitionToHeader = this._builder.build([
      style({ position: 'absolute', left: `${left}px`, top: `${top}px`, width: `${currentWidth}px`, background: '#fff', height: 'auto', 'min-height': `${currentHeight}px` }),
      group([
        animate('300ms cubic-bezier(0.2, 1.20, 0.6, 1)', style({ left: `${finalLeft}px` })),
        animate('300ms cubic-bezier(0.2, -.20, 0.6, 1)', style({ top: `${finalTop}px` })),
        animate('300ms ease-out', style({ width: `100%` })),
        animate('300ms ease-out', style({ 'min-height': '50px' })),
      ])
    ]);
    const disparition = this._builder.build([
      style({ opacity: 1 }),
      animate('100ms ease-out', style({ opacity: 0 })),
    ]);
    const player = transitionToHeader.create(this._selectedContainer.nativeElement);
    player.play();
    player.onDone(() => {
      this.selectionEnds.emit();
    });
    disparition.create(this._itemContent.nativeElement).play();
  }

  @HostBinding('@itemState') get state() {
    return this._state;
  }

}
