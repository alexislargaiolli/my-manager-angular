import { animate, AnimationMetadata, state, style, transition, trigger, group, animation, query, stagger, animateChild } from '@angular/animations';

export const routeAnimation: AnimationMetadata =
    trigger('routeAnimation', [
        transition('* => projectHome', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', opacity: 0 })
                , { optional: true }),
            query(':leave', [
                animateChild(),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
            ], { optional: true }),
            group([
                query(':enter .create-column', [
                    style({ opacity: 0, transform: 'translateX(-100%)' }),
                    animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                ]),
                query(':enter .actions-panel>button', [
                    style({ opacity: 0, transform: 'translateY(-100%)' }),
                    stagger('30ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                ]),
                query(':enter app-project-list-item, :enter .item-slot,:enter app-note-item', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('40ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
            ]),
            animateChild()
        ]),
        transition('* => projectDashboard', [
            query(':enter', [
                style({ opacity: 0 }),
            ], { optional: true }),
            query(':leave', [
                style({ position: 'fixed', width: '100%', opacity: 1 }),
                animate('200ms ease', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 1 }),
            ], { optional: true }),
            group([
                query(':enter app-project-title>div>*, :enter app-note-item', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
                query(':enter .actions-panel>button', [
                    style({ opacity: 0, transform: 'translateY(-100%)' }),
                    stagger('30ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                ]),
                query(':enter .link-square', [
                    style({ opacity: 0, transform: 'translateY(100%)' }),
                    stagger('60ms', animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateY(0%)' })))
                ])
            ])
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
            ], { optional: true }),
            group([
                query(':enter app-devis-list-item, :enter .item-slot', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
                query(':enter .create-column', [
                    style({ opacity: 0 }),
                    animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter .devis-form', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                ]),
                query(':enter app-devis-preview', [
                    style({ opacity: 0 }),
                    animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter .square-list-item, :enter .item-slot', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
                query(':enter .create-column', [
                    style({ opacity: 0 }),
                    animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter .devis-form', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' }))
                ]),
                query(':enter app-invoice-preview', [
                    style({ opacity: 0 }),
                    animate('300ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1 }))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter .kanban-column-wrapper', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter .col, :enter button', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
            ])
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
            ], { optional: true }),
            group([
                query(':enter p, :enter mat-input-container, :enter button', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    stagger('60ms', animate('200ms cubic-bezier(.3,.6,.5,1)', style({ opacity: 1, transform: 'translateX(0%)' })))
                ]),
            ])
        ]),
    ]);
