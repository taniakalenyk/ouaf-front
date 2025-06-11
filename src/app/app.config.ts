import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {jwtInterceptor} from './services/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), {
    provide: LOCALE_ID,
    useValue: 'fr-FR'
  }, provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor]))]
};
