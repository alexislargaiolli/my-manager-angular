import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';
import { MyRouterAnimation } from "app/root-component/router-animation.types";

export const projectSettingsIdle = [
    query('app-project-settings', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

export const projectSettingsApparition = [
    query('app-project-settings', style({ opacity: 1, overflow: 'hidden' })),
    query('app-project-settings .container', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
    ]),
    query('app-project-settings .container',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true })
]

export const projectSettingsDisparition = [
    query('app-project-settings', style({ overflow: 'hidden' })),
    query('app-project-settings .container', style({ opacity: 1, transform: 'translateY(0%)' })),
    query('app-project-settings .container',
        stagger('100ms', [
            animate('300ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
        ])
        , { optional: true }),
    query('app-project-settings app-project-menu', style({ opacity: 0 })),
]

export function projectSettingsAnims() {
    return {
        routerState: 'projectSettings',
        idleAnim: projectSettingsIdle,
        apparitionAnim: projectSettingsApparition,
        disparitionAnim: projectSettingsDisparition
    };
}
