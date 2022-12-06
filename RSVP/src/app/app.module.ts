import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AirtableAuthInterceptor } from './airtable-auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { GuestListComponent } from './guest-list/guest-list.component';

export const BASE_URL = new InjectionToken<string>('BaseUrl');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    GuestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: BASE_URL, useValue:'https://api.airtable.com/v0/appqJroNsgQsxxmTA'},
    {provide: AIRTABLE_PAT, useValue: 'pat3LQPpy6kvToyvy.dd638721e048f869edadb1f2c9890ae618a5e2b02fabbbdb6a7f96a40e9c9d90'},
    {provide: HTTP_INTERCEPTORS, useClass: AirtableAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
