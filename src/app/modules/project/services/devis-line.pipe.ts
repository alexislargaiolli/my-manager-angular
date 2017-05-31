import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'devisLine'
})
export class DevisLinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/\n\-(.*)/g, '<li class="small pl-4">$1</li>').replace(/(?:\r\n|\r|\n)/g, '<br />'); // .replace(/<\/li><br\ \/>/g, '<br />');
  }

}
