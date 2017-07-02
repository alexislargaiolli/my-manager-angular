import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, ContentChildren, TemplateRef, ContentChild, ChangeDetectionStrategy, SimpleChanges, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IModel } from 'app/modules/core';
import { progressBarAnim, listItemAnim } from './list.animations';
import { ReduxSubscriptionComponent } from '../../../core/components/redux-subscription-component/redux-subscription-component';
import { ListItemComponent } from './list-item/list-item.component';
import { AnimationBuilder, AnimationPlayer, style, animate, stagger, AnimationFactory, transition, state } from '@angular/animations';
import { ListItemDirective } from './list-item-directive/list-item.directive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    progressBarAnim
  ]
})
export class ListComponent extends ReduxSubscriptionComponent implements OnInit, AfterViewInit {

  @ViewChildren(ListItemComponent) viewChildren: QueryList<ListItemComponent>;

  @ContentChild(ListItemDirective, { read: TemplateRef }) appListItemTemplate;

  @Input()
  loading: boolean;

  _items: any[];

  addedElements = [];

  elementsToRemove: { index: number, item: any }[] = [];

  insertedElementToRemove = [];

  animatingElementCount = 0;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { super() }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items.previousValue) {
      this.addedElements = [];
      if (changes.items.currentValue.length > changes.items.previousValue.length) {
        //Search for just added elements
        this.addedElements = this._items.filter((item) => changes.items.previousValue.indexOf(item) < 0 && !this.isRemovedElement(item));
      }
    }
  }

  ngAfterViewInit() {
    this.addSub(
      this.viewChildren.changes.subscribe(e => {
        if (this.addedElements.length > 0) {
          this.processAnimation();
          this.addedElements = [];
        }
      })
    );
  }

  /**
   * Process animation of all ListItemComponent
   */
  private processAnimation() {
    let startY = 0;
    let endY = 0;
    let previousItem: ListItemComponent = null;
    this.viewChildren.forEach((viewItem: ListItemComponent) => {
      if (startY || endY) {
        viewItem.translateY(startY, endY, () => { this.animationStarts() }, () => { this.animationEnds() });
        if (startY) {
          startY += viewItem.elementRef.nativeElement.offsetHeight;
        }
        if (endY) {
          endY += viewItem.elementRef.nativeElement.offsetHeight;
        }
      }

      if (this.isAddedElement(viewItem.item)) {
        viewItem.enter(() => { this.animationStarts() }, () => { this.animationEnds() });
        if (!startY) {
          startY = viewItem.elementRef.nativeElement.offsetTop;
        }
        else if (previousItem && previousItem.isEntering()) {
          viewItem.delay = '50ms';
          viewItem.translateY(startY + previousItem.elementRef.nativeElement.offsetHeight, endY, () => { this.animationStarts() }, () => { this.animationEnds() });
          startY -= viewItem.elementRef.nativeElement.offsetHeight;
        }
      }
      else if (this.isRemovedElement(viewItem.item)) {
        if (endY && previousItem && previousItem.isLeaving()) {
          endY -= viewItem.elementRef.nativeElement.offsetHeight;
        }
        if (!endY) {
          endY = viewItem.elementRef.nativeElement.offsetTop;
        }
        viewItem.leave(() => { this.animationStarts() }, () => { this.animationEnds() });
      }
      previousItem = viewItem;
    });
  }

  /**
   * Check if an element has just been added
   * @param viewItem element to check
   */
  private isAddedElement(item): boolean {
    return this.addedElements.indexOf(item) != -1;
  }

  /**
   * Check if an element has just been removed
   * @param viewItem element to check
   */
  private isRemovedElement(pItem): boolean {
    for (let item of this.elementsToRemove) {
      if (item.item === pItem) {
        return true;
      }
    }
    return false;
  }

  /**
   * Removes removed element from current items and reset elements by calling resetElements()
   */
  public clearRemoveElement() {
    if (this.elementsToRemove.length > 0) {
      this.elementsToRemove.forEach(pItem => {
        const index = this._items.indexOf(pItem.item);
        if (index != -1) {
          this._items.splice(index, 1);
        }
        this._changeDetectorRef.detectChanges();
      });
      this.elementsToRemove = [];
      this.insertedElementToRemove = [];
      this.resetElements();
    }
  }

  /**
   * Reset transformation of all elements
   */
  private resetElements() {
    this.viewChildren.forEach((viewItem: ListItemComponent) => {
      viewItem.resetTransformation();
    });
  }

  /**
   * Call when an animation starts. Keep track of running animation count.
   */
  private animationStarts() {
    this.animatingElementCount++;
  }

  /**
   * Call when an animation ends. Keep track of running animation count.
   * Clear removed items if running animation count reaches 0.
   */
  private animationEnds() {
    this.animatingElementCount--;
    if (this.animatingElementCount === 0) {
      this.clearRemoveElement();
    }
  }

  public get items() {
    return this._items;
  }

  /**
   * Intersept items to keep removed items until their leave animation finish 
   */
  @Input()
  public set items(items) {
    if (items && this._items && (this._items.length - this.elementsToRemove.length) > items.length) {
      //Search for removed elements      
      this.searchRemovedItems(items);
      this.processAnimation();
    }
    else {
      this._items = items;
      //Re insert removed elements until animations finish
      this.reInsertRemovedItem();
    }
  }

  /**
   * Search for element in current item list that are not in the given item list
   * @param items a list of item
   */
  private searchRemovedItems(items: any[]) {
    this.elementsToRemove = [];
    this._items.forEach((item, index) => {
      if (items.indexOf(item) < 0)
        this.elementsToRemove.push({ index, item })
    });
  }

  /**
   * Insert removed element in current item list
   */
  private reInsertRemovedItem() {
    if (this.elementsToRemove.length > 0) {
      for (let item of this.elementsToRemove) {
        if (this.insertedElementToRemove.indexOf(item) === -1) {
          this._items.splice(item.index, 0, item.item);
          this.insertedElementToRemove.push(item);
        }
      }
    }
  }
}
