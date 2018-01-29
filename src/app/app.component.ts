import { Component,ViewChild } from '@angular/core';
import {App, Platform,MenuController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { RegisterPage } from '../pages/register/register';
import { AuhtProvider } from '../providers/auht/auht';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  rootPage:any =LoginPage;
  @ViewChild(Nav) nav: Nav;
  //rootPage: any = TabsPage;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private storage: Storage,private menu:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // verifica si un usuario ya esta logeado y lo redirecciona la home
      this.storage.get('user').then((user) => {
        if(user!=null)
          this.rootPage=HomePage;
      });

      
    });


    this.pages = [
      { title: 'about', component: AboutPage },
      { title: 'home', component: HomePage }
    ];
  }

  logOut(){
     this.storage.set('user',null);
     this.gotoLogin();
  }
  gotoLogin(){
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }

  
}
