import { log } from 'util';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myKeys' })
export class KeysPipe implements PipeTransform {
    public transform(value, args: string[]): any {
        let keys = [];
        for (let enumMember in value) {
            let isValueProperty = parseInt(enumMember, 10) >= 0;
            if (isValueProperty) {
                keys.push({ key: enumMember, value: value[enumMember] });
                // Uncomment if you want log
                // console.log("enum member: ", value[enumMember]);
            }
        }
        return keys;
    }
}
