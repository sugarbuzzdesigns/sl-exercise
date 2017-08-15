import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messsagesCategoryFilter'
})

export class MesssagesCategoryFilterPipe implements PipeTransform {

  transform(arr: any, args?: any): any {
    return arr.filter(function(word){
      return word.length > 6;
    });
  }
}
