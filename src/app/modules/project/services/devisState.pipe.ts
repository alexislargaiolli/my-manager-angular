import { Pipe, PipeTransform } from '@angular/core';
import { DevisState } from 'app/models';

@Pipe({
  name: 'devisState'
})
export class DevisStatePipe implements PipeTransform {

  transform(value: DevisState, args?: any): any {
    switch (value) {
      case DevisState.DRAFT:
        return 'Brouillon';
      case DevisState.PENDING:
        return 'En attente';
      case DevisState.ACCEPTED:
        return 'Accepté';
      case DevisState.REFUSED:
        return 'Refusé';
      case DevisState.PAID:
        return 'Payé';
    }
    return null;
  }

}
