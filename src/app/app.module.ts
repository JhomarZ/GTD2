import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'; // Lib para almacena datos en el app
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { FavoritesPage } from '../pages/favorites/favorites';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TournamentDetailPage } from '../pages/tournament-detail/tournament-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuhtProvider } from '../providers/auht/auht';
import { PlayerProvider } from '../providers/player/player';
import { TournamentProvider } from '../providers/tournament/tournament';


import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    FavoritesPage,
    TournamentsPage,
    TournamentDetailPage,
    TabsPage    
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    FavoritesPage,
    TournamentsPage,
    TournamentDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuhtProvider,
    PlayerProvider,
    TournamentProvider
  ]
})
export class AppModule {}
