import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';
import { MyRouterAnimation } from '../../../../../root-component/router-animation.types';

export const projectInvoiceIdle = [
    query('app-project-invoice', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

export const projectInvoiceApparition = [
    query('app-project-invoice', style({ opacity: 1, overflow: 'hidden' })),
    query('app-project-invoice .square-list', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
    ]),
    query('app-project-invoice .square-list',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true })
]

export const projectInvoiceDisparition = [
    query('app-project-invoice', style({ overflow: 'hidden' })),
    query('app-project-invoice .square-list', style({ opacity: 1, transform: 'translateY(0%)' })),
    query('app-project-invoice .square-list',
        stagger('100ms', [
            animate('300ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
        ])
        , { optional: true }),
    query('app-project-invoice app-project-menu', style({ opacity: 0 })),
]

export function projectInvoiceAnims() {
    return {
        routerState: 'projectInvoices',
        idleAnim: projectInvoiceIdle,
        apparitionAnim: projectInvoiceApparition,
        disparitionAnim: projectInvoiceDisparition
    };
}
