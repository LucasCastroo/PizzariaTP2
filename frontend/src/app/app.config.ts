import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {authInterceptorProvider} from "./services/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),authInterceptorProvider,  importProvidersFrom(HttpClientModule), provideAnimationsAsync()]
};
