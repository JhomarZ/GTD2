import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public user: any;
  public tournamentList:Array<any>=[];

  constructor(public navCtrl: NavController, 
              public tournamentProvider:TournamentProvider,
              public navParams: NavParams,
              private storage: Storage) {
  
  }

  ionViewDidLoad() {

    this.storage.get('user').then((user) => {
      if(user!=null){
        this.user=user;
        this.getTournaments();
        }
    });
  
  }

  getTournaments(infiniteScroll=null){
    
    this.tournamentProvider.getTournamentsList(this.user.usr_id,this.tournamentList.length)
    .subscribe(
      (data)=>{
        console.log("data");
        console.log(data.records[0]);
        console.log("total="+data.records[0].Table.length);
        //console.log(data);
        //this.newsFeeds=data;
        if(data.records[0].msgcod===true){
          if(data.records[0].Table.length >0){
            //this.matchs=data.records[0].Table;
             for(var tournament in data.records[0].Table)
            {
              console.log("entro");  
              //data.records[0].Table[feedKey].LogoTeam1=SERVER_PATH_IMG+data.records[0].Table[feedKey].LogoTeam1;
              //data.records[0].Table[feedKey].LogoTeam2=SERVER_PATH_IMG+data.records[0].Table[feedKey].LogoTeam2;
              console.log(data.records[0].Table[tournament]);  
              this.tournamentList.push(data.records[0].Table[tournament]);
  
            }
            if(infiniteScroll!=null){ infiniteScroll.complete(); }  //para detener el scroll
            
          }
        }
        
        /*else
        {
          this.presentAlert("Ingreso Fallo",data.records[0].msgdes);
        }*/
      },
      error => {
        console.log("fallo");
        if(infiniteScroll!=null){ infiniteScroll.complete(); }
      }); 
  }

  doInfinite(infiniteScroll){
    console.log("buscar");
    //infiniteScroll.complete();
    this.getTournaments(infiniteScroll);
    //this.getNewsFeed(this.fbGuid,infiniteScroll);
  }
}
