import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                position: 'absolute',
                width: '100%'
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.2s ease-out', style({
                opacity: 0,
                position: 'absolute',
                width: '100%'
            }))
        ])
    ]);