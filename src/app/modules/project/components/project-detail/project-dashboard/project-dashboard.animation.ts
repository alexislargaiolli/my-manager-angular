import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';
import { MyRouterAnimation } from '../../../../../root-component/router-animation.types';

export const projectDashboardApparition = [
    query('app-project-dashboard', style({ opacity: 1 })),
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
    ]),
    query('app-project-dashboard .subheader', [
        style({ transform: 'scaleY(0)', 'transform-origin': 'top' }),
        animate('300ms ease-in-out', style({ transform: 'scaleY(1)' })),
    ]),
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true })
];

export const projectDashboardApparitionFromOutside = [
    query('app-project-dashboard', style({ opacity: 1 })),
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history, app-project-dashboard app-project-menu', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
    ]),
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history, app-project-dashboard app-project-menu',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true })
]

export const projectDashboardDisparitionToOutside = [
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history, app-project-dashboard app-project-menu', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-5%)' })),
        animateChild()
    ]),
    query('app-project-dashboard .subheader', [
        style({ transform: 'scaleY(1)', 'transform-origin': 'top' }),
        animate('300ms ease-in-out', style({ transform: 'scaleY(0.666)' })),
    ]),
]

export const dashboardDisparition = [
    query('app-project-dashboard .subheader>div, app-project-dashboard .block-link, app-project-dashboard project-history', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-5%)' })),
        animateChild()
    ]),
    query('app-project-dashboard .subheader', [
        style({ opacity: 1, transform: 'scaleY(1)', 'transform-origin': 'top' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'scaleY(0)' })),
    ]),
    query('app-project-dashboard app-project-menu', style({ opacity: 0 })),
]

export const projectDashboardIdle = [
    query('app-project-dashboard', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

export function projectDashboardAnims() {
    return {
        routerState: 'projectDashboard',
        idleAnim: projectDashboardIdle,
        apparitionAnim: projectDashboardApparition,
        disparitionAnim: dashboardDisparition
    };
}
