import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceState } from 'app/models';

@Pipe({
  name: 'invoiceState'
})
export class InvoiceStatePipe implements PipeTransform {

  transform(value: InvoiceState, args?: any): any {
    switch (value) {
      case InvoiceState.DRAFT:
        return 'Brouillon';
      case InvoiceState.PENDING:
        return 'En attente';
      case InvoiceState.PAID:
        return 'Payée';
      case InvoiceState.ABANDONED:
        return 'Abandonnée';
    }
    return null;
  }

}
