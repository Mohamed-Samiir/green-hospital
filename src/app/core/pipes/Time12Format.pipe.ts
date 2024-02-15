import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Time12Format'
})
export class Time12FormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let timeParts = value?.split(":")
    let periodLabel
    if (parseInt(timeParts[0]) > 12) {
      periodLabel = "PM"
      timeParts[0] = (parseInt(timeParts[0]) - 12).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    } else {
      periodLabel = "AM"
    }

    return timeParts[0] + ":" + timeParts[1] + " " + periodLabel;
  }

}
