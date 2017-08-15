import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages/messages.service';
import { MesssagesCategoryFilterPipe } from './messages/messsages-category-filter.pipe';
import { StripHtmlPipe } from './strip-html.pipe';
import { FilterMessagesPipe } from './filter-messages.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MesssagesCategoryFilterPipe,
    StripHtmlPipe,
    FilterMessagesPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule {
  someVar = 'from parent app';
}
