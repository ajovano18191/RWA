import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { appRoutes } from './app.routes';
import { matchReducer } from './store/match.reducer';
import { oddsReducer } from './store/odds.reducer';
import * as offerEffects from './store/offers.effects';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(StoreModule.forRoot({ odds: oddsReducer, match: matchReducer })),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideHttpClient(),
    provideEffects(offerEffects),
],
};
