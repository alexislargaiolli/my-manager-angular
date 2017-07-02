import { AnimationMetadata, trigger, transition, animate, style, query, stagger, group, state } from '@angular/animations';
import { ListItemActionsComponent } from './list-item-actions.component';

export const itemActionAnim: AnimationMetadata =
    trigger('itemActionAnim', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('200ms ease-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            animate('200ms ease-in', style({ opacity: 0 }))
        ])
    ])
