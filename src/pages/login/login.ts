import { Component, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuhtProvider } from '../../providers/auht/auht';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario;
   //private frmLogin : FormGroup;
   @ViewChild("username") username;
   @ViewChild("password") password;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              public auhtProvider:AuhtProvider,private alertCtrl: AlertController) {

     
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginApp(){
    //this.presentAlert(); return;
    console.log(this.username);
    this.auhtProvider.login(this.username.value,this.password.value)
    .subscribe(
      (data)=>{
        console.log("data");
        console.log(data.records[0]);
        if(data.records[0].msgcod===true){
          this.presentAlert("Exito","Ingreso correctamento");
        }
        else
        {
          this.presentAlert("Ingreso Fallo",data.records[0].msgdes);
        }
      });
  }
  
  goToRegister(){
    console.log("register");
    this.navCtrl.push(RegisterPage);
  }

  presentAlert(msgtitle,msgdes) {
    let alert = this.alertCtrl.create({
      title: msgtitle,
      subTitle: msgdes,
      buttons: ['Entendido']
    });
    alert.present();
  }
}
