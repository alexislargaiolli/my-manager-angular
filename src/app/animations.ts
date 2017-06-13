import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger } from '@angular/animations';

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
                transform: 'translateX(0%)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-10%)'
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

export const centerApparitionAnimation: AnimationMetadata =
    trigger('centerApparitionAnimation', [
        state('*',
            style({
                opacity: 1,
                'transform-origin': 'center center',
                transform: 'scale(1)'
            })
        ),
        transition(':enter', [
            group([
                style({
                    opacity: 0,
                    transform: 'scale(0.95)'
                }),
                animate('.3s cubic-bezier(.06,.59,.27,1.67)'),
            ])
        ])
    ]);

export const listFadeAnim: AnimationMetadata =
    trigger('listFadeAnim', [
        transition('* => *', [
            // this hides everything right away
            query('.anim-item', style({ opacity: 0 }), { optional: true }),

            // starts to animate things with a stagger in between
            query('.anim-item', stagger('60ms', [
                animate('600ms ease-in', style({ opacity: 1 }))
            ]), { optional: true })
        ])
    ]);

export const listSlideAnim: AnimationMetadata =
    trigger('listSlideAnim', [
        transition('* => *', [
            // this hides everything right away
            query('.anim-item', style({ opacity: 0, transform: 'translateX(-20%)' }), { optional: true }),

            // starts to animate things with a stagger in between
            query('.anim-item', stagger('60ms', [
                group([
                    animate('300ms ease-in', style({ opacity: 1 })),
                    animate('200ms ease-out', style({ transform: 'translateX(0%)' }))
                ])
            ]), { optional: true })
        ])
    ]);

export const fadeAnim: AnimationMetadata =
    trigger('fadeAnim', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ])
    ]);
