import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';

export const startAnimation: AnimationMetadata =
    trigger('startAnimation', [
        transition('true => false', [
            query('.site-inialized-content', style({ opacity: 0 })),
            query('app-auto-login', [
                style({ opacity: 1, position: 'absolute' }), animate('500ms ease-in', style({ opacity: 0 }))
            ], { optional: true }),
            query('.site-inialized-content', [
                animate('500ms ease-out', style({ opacity: 1 })),

            ]),
            query('main', animateChild())
        ])
    ]);
