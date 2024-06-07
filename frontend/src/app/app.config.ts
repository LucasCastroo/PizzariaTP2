import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {authInterceptorProvider} from "./services/auth.interceptor";
import {provideNativeDateAdapter} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {provide: LOCALE_ID, useValue: "pt"}, authInterceptorProvider,  importProvidersFrom(HttpClientModule), provideAnimationsAsync(), provideNativeDateAdapter()]
};
