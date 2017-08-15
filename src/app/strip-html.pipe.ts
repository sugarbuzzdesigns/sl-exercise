import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string, args?: any): any {
      return value ? String(value).replace(/<[^>]+>/gm, '') : '';
  }
}
