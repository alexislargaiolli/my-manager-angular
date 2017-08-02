import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BreakpointsService {

    public readonly BREAKPOINTS = {
        xs: {
            max: 575
        },
        sm: {
            max: 767
        },
        md: {
            max: 991
        },
        lg: {
            max: 1199
        }
    };

    public breakpointChanges = new Subject<BreakpointEvent>();
    private _currentBreakpoint: string;

    constructor() {
        Observable.fromEvent(window, 'resize').subscribe(e => {
            this.detectBreakpointChanges();
        });
        this.detectBreakpointChanges();
    }

    private detectBreakpointChanges() {
        const bp = this.getBreakpoint();
        if (!this._currentBreakpoint || this._currentBreakpoint !== bp) {
            this.breakpointChanges.next(new BreakpointEvent(this._currentBreakpoint, bp));
        }
        this._currentBreakpoint = bp;
    }

    private getBreakpoint() {
        const w = window.innerWidth;
        if (w < this.BREAKPOINTS.xs.max) {
            return 'xs';
        } else if (w < this.BREAKPOINTS.sm.max) {
            return 'sm';
        } else if (w < this.BREAKPOINTS.md.max) {
            return 'md';
        } else if (w < this.BREAKPOINTS.lg.max) {
            return 'lg';
        }
        return 'xl';
    }

    public get currentBreakpoint(): string {
        return this._currentBreakpoint;
    }

}

export class BreakpointEvent {
    previousBreakpoint: string;
    newBreakpoint: string;
    constructor(previous, next) {
        this.previousBreakpoint = previous;
        this.newBreakpoint = next;
    }
}
