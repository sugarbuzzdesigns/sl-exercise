import { Pipe, PipeTransform } from '@angular/core';
import { MessagesService } from './messages/messages.service'

@Pipe({
  name: 'filterMessages'
})
export class FilterMessagesPipe implements PipeTransform {
  constructor(private messagesService:MessagesService) {}

  transform(messages: any, args?: any): any {        
    let filteredArray = [];
   
    messages.forEach((message, i) => {      
      if (message.tags.indexOf(args) != -1) {
        filteredArray.push(message);
      }
    });

    if (args === 'All'){
      return messages;
    }

    if (args === 'trash') {
      return this.messagesService.getTrashedMessages();
    }

    if (args === 'archive') {
      return this.messagesService.getArchivedMessages();
    }    

    return filteredArray;
  }
}
