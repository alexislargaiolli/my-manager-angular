import { Pipe, PipeTransform } from '@angular/core';
import { Address } from "app/my-manager/model/address.model";

@Pipe({
  name: 'myAddress'
})
export class AddressPipe implements PipeTransform {

  transform(address: Address, args?: any): any {
    return `${address.street} ${address.zipcode} ${address.city}`;
  }

}
