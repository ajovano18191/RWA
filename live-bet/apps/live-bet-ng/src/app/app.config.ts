import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { SocketIoModule } from 'ngx-socket-io';
import { AuthInterceptor } from './Login/auth.interceptor';
import { appRoutes } from './app.routes';
import { socketIoConfig } from './const';
import { favoriteReducer } from './store/favorite.reducer';
import { matchReducer } from './store/match.reducer';
import { oddsReducer } from './store/odds.reducer';
import * as offerEffects from './store/offers.effects';
import { ticketReducer } from './store/ticket.reducer';
import { userReducer } from './store/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    importProvidersFrom(SocketIoModule.forRoot(socketIoConfig)),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(StoreModule.forRoot({ odds: oddsReducer, match: matchReducer, ticket: ticketReducer, user: userReducer, favorite: favoriteReducer, })),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideHttpClient(withInterceptors([AuthInterceptor]), ),
    provideEffects(offerEffects),
  ],
};
