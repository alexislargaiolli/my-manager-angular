import { animate, AnimationMetadata, state, style, transition, trigger, group } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation: AnimationMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0%) scale(1)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-5%) scale(0.95)'
            }),
            animate('120ms ease-out', style({ opacity: 1, transform: 'translateX(0%) scale(1)' }))
        ]),
        // transition(':leave', [
        //     style({ position: 'absolute', transform: 'translateX(0%) scale(1)' }),
        //     animate('100ms ease-in', style({
        //         position: 'absolute',
        //         transform: 'translateX(5%) scale(0.9)'
        //     }))
        // ])
    ]);
export const apparitionAnimation: AnimationMetadata =
    trigger('apparitionAnimation', [
        state('*',
            style({
                opacity: 1
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.2s ease-out', style({
                opacity: 0,
            }))
        ])
    ]);

export const slideApparitionAnimation: AnimationMetadata =
    trigger('slideApparitionAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0%) scale(1)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-10%) scale(0.95)'
            }),
            animate('.3s cubic-bezier(.06,.59,.27,1.67)')
        ])
    ]);

export const rightSlideApparitionAnimation: AnimationMetadata =
    trigger('rightSlideApparitionAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0%) scale(1)'
            })
        ),
        transition(':enter', [
            group([
                style({
                    opacity: 0,
                    transform: 'translateX(10%) scale(0.95)'
                }),
                animate('.3s cubic-bezier(.06,.59,.27,1.67)'),
            ])
        ])
    ]);
