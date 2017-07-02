import { AnimationMetadata, trigger, transition, animate, style, query, stagger, group } from '@angular/animations';

export const progressBarAnim: AnimationMetadata =
    trigger('progressBarAnim', [
        transition(':leave', [
            animate('200ms ease-in', style({
                opacity: 0
            }))
        ])
    ]);

export const listItemAnim: AnimationMetadata =
    trigger('listItemAnim', [

        transition('* => *', [
            // this hides everything right away
            query(':enter', style({ opacity: 0, transform: 'translateX(-20%)', height: 0 }), { optional: true }),

            // starts to animate things with a stagger in between
            query(':enter', stagger('60ms', [
                group([
                    // animate('200ms ease-in', style({ height: '*' })),
                    animate('3000ms ease-in', style({ opacity: 1 })),
                    animate('200ms ease-out', style({ transform: 'translateX(0%)' }))
                ])
            ]), { optional: true }),

            query('.ng-animating:not(.ng-leave) ~ *', [
                style({ transform: 'translateY(-100%)' }),
                animate('1000ms ease-in', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),

            query(':leave', [
                style({ opacity: 1 }),
                animate('1000ms ease-in', style({
                    opacity: 0
                }))
            ], { optional: true }),

            query('.ng-leave ~ *', [
                stagger('100ms', [
                    animate('1000ms ease-in', style({ transform: 'translateY(-100%)' }))
                ])
            ], { optional: true })
        ])

    ]);
