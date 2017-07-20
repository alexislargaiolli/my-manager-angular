import { IMyDateModel } from 'mydatepicker';

export class DateUtils {
    public static jsDateToMyDate(date: Date): Object {
        if (!date) {
            return;
        }
        const d = new Date(date);
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

    public static dayBeweenTwoDate(date1: Date, date2: Date) {
        const timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}
