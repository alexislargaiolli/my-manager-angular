import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';
import { MyRouterAnimation } from '../../../../../root-component/router-animation.types';

export const projectTaskIdle = [
    query('app-project-task', style({ position: 'absolute', width: '100%', opacity: 0 })),
]

export const projectTaskApparition = [
    query('app-project-task', style({ opacity: 1 })),
    query('app-task-kaban', style({ overflow: 'hidden' })),
    query('app-project-task .kanban-column-wrapper', style({ opacity: 0, transform: 'translateY(10%)' })),
    query('app-project-task .kanban-column-wrapper',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ])
        , { optional: true }),
]

export const projectTaskDisparition = [
    query('app-task-kaban', style({ overflow: 'hidden' })),
    query('app-project-task .kanban-column-wrapper', style({ opacity: 1, transform: 'translateY(0%)' })),
    query('app-project-task .kanban-column-wrapper',
        stagger('50ms', [
            animate('300ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
        ])
        , { optional: true }),
    // query('app-project-task app-project-menu', style({ opacity: 0 })),
];

export function projectTaskAnims() {
    return {
        routerState: 'projectTasks',
        idleAnim: projectTaskIdle,
        apparitionAnim: projectTaskApparition,
        disparitionAnim: projectTaskDisparition
    };
}
