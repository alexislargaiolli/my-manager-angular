import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';

export const projectHomeIdle = [
    query('project-home', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

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

export const projectHomeDisparition = [
    query('app-project-dashboard', style({ position: 'absolute', width: '100%', opacity: 0 })),
    query('project-home .subheader *, project-home project-list', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-5%)' })),
    ]),
    query('project-home .subheader', [
        style({ transform: 'scaleY(1)', 'transform-origin': 'top' }),
        animate('300ms ease-in-out', style({ transform: 'scaleY(1.5)' })),
    ]),
]

export const projectHomeApparition = [
    query('project-home', style({ opacity: 1 })),
    query('project-home .subheader>div, project-home project-list mat-card', style({ opacity: 0, transform: 'translateY(10%)' })),
    query('project-home .subheader>div, project-home project-list mat-card',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true }),
    animateChild()
]

