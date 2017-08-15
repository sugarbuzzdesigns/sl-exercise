import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  // Inject the messages service
  constructor(private messagesService:MessagesService) { }
  // create message object model in future
  messages:Array<any> = [];
  // actions menu will open when messages
  // are selected. Then, the user can trash
  // or archive selected messages
  actionsMenuActive:boolean = false;
  // selected state for messages
  messageState = {};
  // Array of message tag objects. Could create
  // message tag object model
  messageTags:Array<any>;
  // Current filter tag name for message pipe
  filterTag:string = '';
  // Keep track of checked messages
  selectedMessages:Array<any> = [];
  // Array of all trashed messages
  trashedMessages:Array<any> = [];
  // Array of all archived messages
  archivedMessages:Array<any> = [];
  // Current sort order by date. ASC || DESC
  currentDateSort = 'desc';
  // keeps track of the main menu being open or closed
  menuOpen:boolean = false;
  // Indicates what message category we are viewing. 
  // Inbox - All messages
  // Could also be any tag, archive, or trash
  currentCategory:string = 'Inbox';  

  checkBoxClick(id, $event) {    
    let index = this.messages.findIndex(message => message.id === id);
    
    if($event.target.classList.contains('box') || $event.target.classList.contains('check')){
      
      this.messageState[id] = !this.messageState[id];

      if (this.messageState[id]) {
        this.selectedMessages.push(id);
      } else {
        this.selectedMessages.splice(this.selectedMessages.indexOf(id), 1);
      }
      
      this.toggleActionsMenu();
    }  
  }

  toggleActionsMenu() {
    if (this.selectedMessages.length) {
      this.actionsMenuActive = true;
    } else {
      this.actionsMenuActive = false;
    }
  }

  clearSelectedMessages() {
    this.selectedMessages = [];
    this.messageState = {};
    this.toggleActionsMenu();
  }

  moveSelectedMessages(moveTo, event) {
    let _this = this;
    let targetArray = moveTo === 'trash' ? _this.trashedMessages : _this.archivedMessages;

    _this.selectedMessages.forEach(function(messageId, i){
      let index = _this.messages.findIndex(message => message.id === messageId);
    
      targetArray.push(_this.messages[index]);
      _this.messages.splice(index, 1);
    });
    
    _this.messagesService.setTrashedMessages(_this.trashedMessages);
    _this.messagesService.setArchivedMessages(_this.archivedMessages);
    _this.messageTags = _this.messagesService.getMessageTags(_this.messages);

    _this.clearSelectedMessages()
  }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();
    this.messageTags = this.messagesService.getMessageTags();
    this.filterTag = this.messagesService.getCurrentFilterTag();
    this.sortMessagesBy('date', true);
  }

  openMenu(){
    this.menuOpen = true;
    
  }

  closeMenu(){
    this.menuOpen = false;
  }  

  tagClickHandler($event, tag){    
    $event.preventDefault();
    
    this.filterTag = tag;
    this.currentCategory = tag;

    this.closeMenu();
  }  

  sortMessagesBy(property, onInit:boolean) {
    this.messages.sort(function(a, b) {
        let propA = a[property]; // ignore upper and lowercase
        let propB = b[property]; // ignore upper and lowercase

        if (propA < propB) {
          return -1;
        }
        if (propA > propB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    });
    
    if (onInit || this.currentDateSort === 'asc') {
      this.messages.reverse();
      this.currentDateSort = 'desc';
    } else {
      this.currentDateSort = 'asc';
    }

    this.closeMenu();
  }

}
