import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';
import { MyRouterAnimation } from '../../../../../root-component/router-animation.types';

export const projectDevisIdle = [
    query('app-project-devis', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

export const projectDevisApparition = [
    query('app-project-devis', style({ opacity: 1, overflow: 'hidden' })),
    query('app-project-devis app-devis-list', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
    ]),
    query('app-project-devis app-devis-list',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true })
]

export const projectDevisDisparition = [
    query('app-project-devis', style({ overflow: 'hidden' })),
    query('app-project-devis app-devis-list', style({ opacity: 1, transform: 'translateY(0%)' })),
    query('app-project-devis app-devis-list',
        stagger('100ms', [
            animate('300ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
        ])
        , { optional: true }),
    query('app-project-devis app-project-menu', style({ opacity: 0 })),
]

export function projectDevisAnims() {
    return {
        routerState: 'projectDevis',
        idleAnim: projectDevisIdle,
        apparitionAnim: projectDevisApparition,
        disparitionAnim: projectDevisDisparition
    };
} 
