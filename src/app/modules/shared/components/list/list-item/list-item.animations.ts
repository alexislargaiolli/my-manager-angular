import { AnimationMetadata, trigger, transition, animate, style, query, stagger, group, state } from '@angular/animations';

export const itemStateAnim: AnimationMetadata =
    trigger('itemStateAnim', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(-10%)' }),
            animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            animate('100ms ease-in', style({ opacity: 0 }))
        ])
    ])
