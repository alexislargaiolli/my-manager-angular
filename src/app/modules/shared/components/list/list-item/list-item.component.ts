import { Component, OnInit, Input, HostListener, HostBinding, QueryList, ContentChild, SimpleChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { itemStateAnim } from './list-item.animations';
import { ListItemActionsComponent } from '../list-item-actions/list-item-actions.component';
import { itemActionAnim } from '../list-item-actions/list-item-actions.animations';
import { AnimationPlayer, AnimationBuilder, style, animate } from '@angular/animations';
import { fadeAnim } from 'app/animations';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {

  public static readonly STATE_INACTIVE = 'INACTIVE';
  public static readonly STATE_ACTIVE = 'ACTIVE';
  public static readonly STATE_ENTERING = 'ENTERING';
  public static readonly STATE_LEAVING = 'LEAVING';

  @Input()
  public item: any;

  @HostBinding('class')
  public state: string = ListItemComponent.STATE_INACTIVE;

  translateAnimation: AnimationPlayer;
  fadeAnimation: AnimationPlayer;
  animSpeed = '300ms';
  startY: number = 0;
  endY: number = 0;
  startX: number = 0;
  endX: number = 0;
  delay: string = '';
  startOpacity: string = '1';
  endOpacity: string = '1';

  constructor(public elementRef: ElementRef, private _builder: AnimationBuilder) { }

  ngOnInit() {
  }

  /**
   * Starts enter animation
   * @param startCallback 
   * @param endCallback 
   * @return true if the animation starts, false if the animation was already started
   */
  public enter(startCallback?, endCallback?): boolean {
    if (this.isEntering())
      return false;
    this.switchState(ListItemComponent.STATE_ENTERING);
    this.startOpacity = '0';
    this.endOpacity = '1';
    this.translateX(-10, 0);
    this.fade(startCallback, endCallback);
    return true;
  }

  /**
   * Starts leave animation
   * @param startCallback 
   * @param endCallback 
   * @return true if the animation starts, false if the animation was already started
   */
  public leave(startCallback?, endCallback?): boolean {
    if (this.isLeaving())
      return false;
    this.switchState(ListItemComponent.STATE_LEAVING);
    this.startOpacity = '1';
    this.endOpacity = '0';
    this.startY = this.getComputedTranslateY();
    this.endY = this.startY;
    this.translateX(0, 10);
    this.fade(startCallback, endCallback);
    return true;
  }

  /**
   * Switch current state to next state
   * @param nextState 
   */
  public switchState(nextState: string) {
    this.state = nextState;
  }

  /**
   * Starts a y translation animation
   * @param startY start position
   * @param endY end position
   * @param startCallback 
   * @param endCallback 
   */
  public translateY(startY: number, endY: number, startCallback?, endCallback?) {
    this.startY = startY !== 0 ? startY - this.elementRef.nativeElement.offsetTop + this.getComputedTranslateY() : this.getComputedTranslateY();
    this.endY = endY !== 0 ? endY - this.elementRef.nativeElement.offsetTop : 0;
    this.translate(startCallback, endCallback);
  }

  /**
   * Starts a x translation animation
   * @param startDeltaX start delta x
   * @param endDeltaX end delta y
   * @param startCallback 
   * @param endCallback 
   */
  public translateX(startDeltaX: number, endDeltaX: number, startCallback?, endCallback?) {
    this.startX = startDeltaX;
    this.endX = endDeltaX;
    this.translate(startCallback, endCallback);
  }

  /**
   * Process translation animation
   * @param startCallback 
   * @param endCallback 
   */
  private translate(startCallback?, endCallback?) {
    if (this.isEntering() || this.isLeaving()) {
      const computedTranslateX = this.getComputedTranslateX();
      if (computedTranslateX != 0) {
        this.startX = computedTranslateX;
      }
    }
    // console.log(`Anim: X: { from: ${this.startX}, to: ${this.endX} },  Y: { from: ${this.startY}, to: ${this.endY} }, opacity: { from: ${this.startOpacity}, to : ${this.endOpacity}}`);

    const factory = this._builder.build([
      style({
        transform: `translateY(${this.startY}px) translateX(${this.startX}px)`
      }),
      animate(`${this.animSpeed} ${this.delay} ease-in-out`,
        style({
          transform: `translateY(${this.endY}px) translateX(${this.endX}px)`
        })
      ),
    ]);
    if (this.translateAnimation) {
      this.translateAnimation.destroy();
    }
    this.translateAnimation = factory.create(this.elementRef.nativeElement, {});
    this.translateAnimation.play();
    if (startCallback)
      startCallback();
    this.translateAnimation.onDone(() => {
      this.endX = 0;
      this.startX = 0;
      this.endY = 0;
      this.startY = 0;
      this.delay = '';
      if (endCallback)
        endCallback();
    });
  }

  /**
   * Process fade animation
   * @param startCallback
   * @param endCallback 
   */
  private fade(startCallback?, endCallback?) {
    const easing = +this.endOpacity > 0 ? 'ease-out' : 'ease-in';
    const factory = this._builder.build([
      style({
        opacity: this.startOpacity,
      }),
      animate(`${this.animSpeed} ${this.delay} ${easing}`,
        style({
          opacity: this.endOpacity,
        }))
    ]);
    if (this.fadeAnimation) {
      this.fadeAnimation.destroy();
    }
    this.fadeAnimation = factory.create(this.elementRef.nativeElement, {});
    this.fadeAnimation.play();
    if (startCallback)
      startCallback();
    this.fadeAnimation.onDone(() => {
      this.startOpacity = '1';
      this.endOpacity = '1';
      this.delay = '';
      if (this.isEntering()) {
        this.switchState(ListItemComponent.STATE_INACTIVE);
      }
      if (endCallback)
        endCallback();
    });
  }

  /**
   * Reset all transformation
   */
  public resetTransformation() {
    const factory = this._builder.build([
      style({ transform: 'translateY(0%)' })
    ]);
    if (this.translateAnimation) {
      this.translateAnimation.destroy();
    }
    this.translateAnimation = factory.create(this.elementRef.nativeElement, {});
    this.translateAnimation.play();
  }

  /**
   * @return current y tranlation of the element
   */
  private getComputedTranslateY(): number {
    if (!window.getComputedStyle) return;
    const style = getComputedStyle(this.elementRef.nativeElement), transform = style.transform || style.webkitTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }

  /**
   * @return current x tranlation of the element
   */
  private getComputedTranslateX() {
    if (!window.getComputedStyle) return;
    const style = getComputedStyle(this.elementRef.nativeElement), transform = style.transform || style.webkitTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  }

  public isLeaving(): boolean {
    return this.state === ListItemComponent.STATE_LEAVING;
  }

  public isEntering(): boolean {
    return this.state === ListItemComponent.STATE_ENTERING;
  }

  public isActive(): boolean {
    return this.state === ListItemComponent.STATE_ACTIVE;
  }

  public isInactive(): boolean {
    return this.state === ListItemComponent.STATE_INACTIVE;
  }

}
