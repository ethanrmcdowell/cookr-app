import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cookr-app","appId":"1:546673215945:web:56a0771a1bfcae721a4018","storageBucket":"cookr-app.appspot.com","apiKey":"AIzaSyCr_mfSc-fdf71It_yqzDCcVgxCTu8OzEo","authDomain":"cookr-app.firebaseapp.com","messagingSenderId":"546673215945","measurementId":"G-W44SXJK3PE"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideAnalytics(() => getAnalytics())), ScreenTrackingService, UserTrackingService, importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync(), provideAnimationsAsync()]
};
