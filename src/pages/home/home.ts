import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { FavoritesPage } from '../favorites/favorites';
import {SERVER_PATH_IMG} from '../../providers/config';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  public playersTop: any;
  public newsFeeds:Array<any>=[];
  
  
  constructor(public navCtrl: NavController,
  public playerProvider:PlayerProvider,
  public tournamentProvider:TournamentProvider,
  //public favoritesPage:FavoritesPage,
  private storage: Storage) {
    
    this.storage.get('user').then((user) => {
        if(user!=null){
          this.user=user;
          this.getTopPlayers();
          this.getNewsFeed();
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
        console.log("data player");
        this.playersTop=data;
      }); 
  }

  getNewsFeed(infiniteScroll=null){
    
    this.tournamentProvider.getNewsFeed(this.user.usr_id,this.newsFeeds.length)
    .subscribe(
      (data)=>{
        console.log("data");
        console.log(data.records[0]);
        console.log("total="+data.records[0].Table.length);
        //console.log(data);
        //this.newsFeeds=data;
        if(data.records[0].Table.length >0){
          //this.matchs=data.records[0].Table;
           for(var feedKey in data.records[0].Table)
          {
            
            if(data.records[0].Table[feedKey].StartDate!="") {
              let date =data.records[0].Table[feedKey].StartDate;
              data.records[0].Table[feedKey].StartDate=moment(date).format("DD MMM - hh:mm a");
              data.records[0].Table[feedKey].lastStartDate=moment(date).format("dddd DD MMMM");
            }
         
                //moment().format("MMM Do YY");  
            data.records[0].Table[feedKey].LogoTeam1=SERVER_PATH_IMG+data.records[0].Table[feedKey].LogoTeam1;
            data.records[0].Table[feedKey].LogoTeam2=SERVER_PATH_IMG+data.records[0].Table[feedKey].LogoTeam2;
            console.log(data.records[0].Table[feedKey].StartDate);  
            this.newsFeeds.push(data.records[0].Table[feedKey]);

          }
          if(infiniteScroll!=null){ infiniteScroll.complete(); }  //para detener el scroll
          
        }
        /*else
        {
          this.presentAlert("Ingreso Fallo",data.records[0].msgdes);
        }*/
      }); 
  }

   jsUcfirst(string) 
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  goToFavoritePage(){
    this.navCtrl.push(FavoritesPage);
  }

  doInfinite(infiniteScroll){
    console.log("buscar");
    //infiniteScroll.complete();
    this.getNewsFeed(infiniteScroll);
    //this.getNewsFeed(this.fbGuid,infiniteScroll);
  }

}
