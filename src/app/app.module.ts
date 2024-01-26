import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PermisionInterceptorInterceptor } from './permision-interceptor.interceptor';
// import { SidebarComponent } from './common-component/sidebar/sidebar.component';
// import { SideBarService } from './shared/side-bar/side-bar.service';


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PermisionInterceptorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    // HeaderComponent,
    // SidebarComponent
  ]
})
export class AppModule { }
