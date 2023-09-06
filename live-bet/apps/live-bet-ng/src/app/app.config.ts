import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { oddsReducer } from './Guest/odds-store/odds.reducer';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(StoreModule.forRoot({ odds: oddsReducer })),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
],
};
