import { animate, AnimationMetadata, state, style, transition, trigger, keyframes } from '@angular/animations';

// Component transition animations
export const listItemStateAnimation: AnimationMetadata =
    trigger('itemState', [
        state('inactive', style({
            transform: 'scale(1)'
        })),
        state('hover', style({
            transform: 'scale(1.05)'
        })),
        state('hide', style({
            opacity: 0,
            // display: 'none'
            // position: 'absolute'
        })),
        // state('selected', style({
        //     position: 'absolute',
        //     // 'margin-left': '10px',
        //     // width: '100%',            
        //     left: 0
        // })),
        transition('inactive => hover', animate('100ms ease-out')),
        transition('hover => inactive', animate('100ms ease-in')),
        transition('* => hide', animate('100ms ease-in')),
        // transition('* => selected', [
        //     style({ position: 'absolute' }),
        //     animate('5s .5s ease-in')
        // ]),
    ]);
