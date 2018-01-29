import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { FavoritesPage } from '../favorites/favorites';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  public playersTop: any;
  public matchs: any;

  constructor(public navCtrl: NavController,
  public playerProvider:PlayerProvider,
  public tournamentProvider:TournamentProvider,
  //public favoritesPage:FavoritesPage,
  private storage: Storage) {
    
    this.storage.get('user').then((user) => {
        if(user!=null){
          this.user=user;
          this.getTopPlayers();
          this.getMatch();
          }
      });
    
  }

  ionViewDidLoad(){
    
  }

  getTopPlayers(){
    //this.presentAlert(); return;
    
    this.playerProvider.getPlayersTop(this.user.usr_id)
    .subscribe(
      (data)=>{
        console.log("data");
        this.playersTop=data;
      }); 
  }

  getMatch(){
    
    this.tournamentProvider.getMatch(this.user.usr_id)
    .subscribe(
      (data)=>{
        console.log("data");
        //console.log(data);
        this.matchs=data;
      }); 
  }
  
  goToFavoritePage(){
    this.navCtrl.push(FavoritesPage);
  }

}
