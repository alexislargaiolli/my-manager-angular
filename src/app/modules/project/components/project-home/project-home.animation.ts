import { animate, AnimationMetadata, state, style, transition, trigger, keyframes } from '@angular/animations';

export const projectHomeAnimation: AnimationMetadata =
    trigger('selectionState', [
        state('*', style({
            opacity: 1,
        })),
        state('selecting', style({
            opacity: 0,
        })),
        transition('* => hide', animate('100ms ease-in')),
    ]);
