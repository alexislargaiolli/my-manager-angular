import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild, AnimationTransitionMetadata } from '@angular/animations';
import { projectTaskApparition, projectTaskDisparition, projectTaskIdle, projectTaskAnims } from '../modules/project/components/project-detail/project-task/project-task.animation';
import { projectDashboardApparition, dashboardDisparition, projectDashboardApparitionFromOutside, projectDashboardDisparitionToOutside, projectDashboardIdle, projectDashboardAnims } from "app/modules/project/components/project-detail/project-dashboard/project-dashboard.animation";
import { projectHomeDisparition, projectHomeApparition, projectHomeIdle } from "app/modules/project/components/project-home/project-home.animation";
import { projectDevisIdle, projectDevisApparition, projectDevisDisparition, projectDevisAnims } from '../modules/project/components/project-detail/project-devis/project-devis.animation';
import { projectSettingsIdle, projectSettingsApparition, projectSettingsDisparition, projectSettingsAnims } from '../modules/project/components/project-detail/project-settings/project-settings.animation';
import { projectInvoiceIdle, projectInvoiceApparition, projectInvoiceDisparition, projectInvoiceAnims } from "app/modules/project/components/project-detail/project-invoice/project-invoice.animation";
import { allTransition, transitionTo, transitionInOut } from './router-animation.types';

export const routeAnimation: AnimationMetadata =
    trigger('routeAnimation', [
        transition('* => projectHome', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', animate('200ms ease', style({ opacity: 0 })), { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.create-column', [
                        style({ opacity: 0, transform: 'translateX(-100%)' }),
                        animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                    ]),
                    query('.actions-panel>button', [
                        style({ opacity: 0, transform: 'translateY(-100%)' }),
                        stagger('30ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                    ]),
                    query('app-project-list-item, .item-slot, app-note-item', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('40ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                ])
            ], { optional: true }),
            animateChild()
        ]),
        transition('* => projectDashboard', [
            query(':enter', [
                style({ opacity: 0 }),
            ]),
            query(':leave', [
                style({ position: 'fixed', width: '100%', opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('app-project-title>div>*, app-note-item', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                    query('.actions-panel>button', [
                        style({ opacity: 0, transform: 'translateY(-100%)' }),
                        stagger('30ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                    ]),
                    query('.link-square', [
                        style({ opacity: 0, transform: 'translateY(100%)' }),
                        stagger('60ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                    ])
                ])
            ], { optional: true }),
            // animateChild()
        ]),
        transition('* => projectDevis', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('app-devis-list-item, .item-slot', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                    query('.create-column', [
                        style({ opacity: 0 }),
                        animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                    ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => projectDevisSelected', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.devis-form', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                    ]),
                    query('app-devis-preview', [
                        style({ opacity: 0 }),
                        animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                    ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => projectInvoices', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.square-list-item, .item-slot', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                    query('.create-column', [
                        style({ opacity: 0 }),
                        animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                    ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => projectInvoiceSelected', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.devis-form', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                    ]),
                    query('app-invoice-preview', [
                        style({ opacity: 0 }),
                        animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                    ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => projectTasks', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.kanban-column-wrapper', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                    // query('.create-column', [
                    //     style({ opacity: 0 }),
                    //     animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                    // ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => projectSettings', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('.col, button', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                ])
            ], { optional: true }),
        ]),
        transition('* => createProject', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
                group([
                    query('p, md-input-container, button', [
                        style({ opacity: 0, transform: 'translateX(-5%)' }),
                        stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                    ]),
                ])
            ], { optional: true }),
        ]),
        // transition('projectHome => projectDashboard', [
        //     ...projectDashboardIdle,
        //     ...projectHomeDisparition,
        //     ...projectDashboardApparitionFromOutside
        // ]),
        // transition('* => projectHome', [
        //     ...projectHomeIdle,
        //     ...projectDashboardDisparitionToOutside,
        //     ...projectHomeApparition
        // ]),
        // ...allTransition(projectDashboardAnims(), projectTaskAnims(), projectDevisAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        // ...allTransition(projectTaskAnims(), projectDashboardAnims(), projectDevisAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        // ...allTransition(projectDevisAnims(), projectTaskAnims(), projectDashboardAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        // ...allTransition(projectInvoiceAnims(), projectTaskAnims(), projectDevisAnims(), projectDashboardAnims(), projectSettingsAnims()),
        // ...allTransition(projectSettingsAnims(), projectTaskAnims(), projectDevisAnims(), projectInvoiceAnims(), projectDashboardAnims()),
    ]);
