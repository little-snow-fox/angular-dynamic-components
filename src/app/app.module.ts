import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupService } from './popup/popup.service';
import { EntityModule } from './entities/entity.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntityModule
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
