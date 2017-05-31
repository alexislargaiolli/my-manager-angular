import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'app/models';

@Pipe({
  name: 'myAddress'
})
export class AddressPipe implements PipeTransform {

  transform(address: Address, args?: any): any {
    return `${address.street} ${address.complement} ${address.zipcode} ${address.city}`;
  }

}
