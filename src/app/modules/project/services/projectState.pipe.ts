import { ProjectState } from 'app/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectState'
})
export class ProjectStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case ProjectState.PROSPECTION:
        return 'En prospection';
      case ProjectState.DEVIS:
        return 'Devis envoyé';
      case ProjectState.PRODUCTION:
        return 'En production';
      case ProjectState.FACTURATION:
        return 'En attente de paiement';
      case ProjectState.FINISHED:
        return 'Terminé';
    }
    return null;
  }

}