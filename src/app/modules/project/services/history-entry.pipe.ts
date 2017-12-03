import { Pipe, PipeTransform } from '@angular/core';
import { HistoryEntryType } from 'app/models';

@Pipe({
  name: 'historyEnrty'
})
export class HistoryEnrtyPipe implements PipeTransform {

  transform(value: HistoryEntryType, args?: any): any {
    switch (value) {
      case HistoryEntryType.CONTACT_MAIL:
        return 'Contact par mail';
      case HistoryEntryType.CONTACT_PHONE:
        return 'Contact par téléphone';
      case HistoryEntryType.CONTACT_RDV:
        return 'Rendez-vous';
      case HistoryEntryType.WORK_TRACKING:
        return 'Suivi travail';
      case HistoryEntryType.OTHER:
        return 'Autre';
    }
    return null;
  }

}