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
        transition('projectHome => projectDashboard', [
            ...projectDashboardIdle,
            ...projectHomeDisparition,
            ...projectDashboardApparitionFromOutside
        ]),
        transition('projectDashboard => projectHome', [
            ...projectHomeIdle,
            ...projectDashboardDisparitionToOutside,
            ...projectHomeApparition
        ]),
        // ...transitionInOut(projectDashboardAnims(), projectTaskAnims())
        ...allTransition(projectDashboardAnims(), projectTaskAnims(), projectDevisAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        ...allTransition(projectTaskAnims(), projectDashboardAnims(), projectDevisAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        ...allTransition(projectDevisAnims(), projectTaskAnims(), projectDashboardAnims(), projectInvoiceAnims(), projectSettingsAnims()),
        ...allTransition(projectInvoiceAnims(), projectTaskAnims(), projectDevisAnims(), projectDashboardAnims(), projectSettingsAnims()),
        ...allTransition(projectSettingsAnims(), projectTaskAnims(), projectDevisAnims(), projectInvoiceAnims(), projectDashboardAnims()),
    ]);
