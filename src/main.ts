import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'; 
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule),  
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' } 
  ],
}).catch((err) => console.error(err));
