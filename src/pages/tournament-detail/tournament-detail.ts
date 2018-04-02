import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides  } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
import {SERVER_PATH_IMG} from '../../providers/config';

/**
 * Generated class for the TournamentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournament-detail',
  templateUrl: 'tournament-detail.html',
})
export class TournamentDetailPage {
  @ViewChild(Slides) slides: Slides;
  nextMatches:any=[];

  constructor(public navCtrl: NavController,
    public tournamentProvider:TournamentProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentDetailPage');

    this.slides.pager=false;
    /*this.slides.paginationBulletRender=function(index, className){
        console.log("pagination");
        console.log(index);
        console.log(className);
        className=".legend"
        if(index===0)
        return '<span class="' + className + '">' + "Posiciones" + '</span>';
        if(index===1)
        return '<span class="' + className + '">' + "Encuentros" + '</span>';
        if(index===2)
        return '<span class="' + className + '">' + "Goleadores" + '</span>';
    }*/

    this.getNextMatches();
    
  }



  getNextMatches(infiniteScroll=null){
    
    this.tournamentProvider.getNextMatches("15","APY2016_F2",this.nextMatches.length)
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
              this.nextMatches.push(data.records[0].Table[tournament]);
              data.records[0].Table[tournament].LogoTeam1=SERVER_PATH_IMG+data.records[0].Table[tournament].LogoTeam1;
              data.records[0].Table[tournament].LogoTeam2=SERVER_PATH_IMG+data.records[0].Table[tournament].LogoTeam2;
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
    this.getNextMatches(infiniteScroll);
    //this.getNewsFeed(this.fbGuid,infiniteScroll);
  }

}
