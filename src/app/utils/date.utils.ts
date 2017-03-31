import { IMyDateModel } from 'mydatepicker';

export class DateUtils {
    public static jsDateToMyDate(date: Date): Object {
        if (!date) {
            return;
        }
        let d: Date = new Date(date);
        return {
            date: {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate()
            }
        };
    }
    public static myDateToJsDate(object: Object): Date {
        if (!object) {
            return;
        }
        return new Date(object['date']['year'], object['date']['month'], object['date']['day']);
    }
}
