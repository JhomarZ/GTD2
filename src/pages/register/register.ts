import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuhtProvider } from '../../providers/auht/auht';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  @ViewChild("uName") uName;
  @ViewChild("uEmail") uEmail;
  @ViewChild("uPwd") uPwd;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auhtProvider:AuhtProvider,
  private alertCtrl: AlertController,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    //this.presentAlert(); return;
    console.log(this.uName.value);
    console.log(this.uEmail.value);
    console.log(this.uPwd.value);
    if(this.validateform()===false) return; // vaidamos los campos del formulario

    this.auhtProvider.register(this.uName.value,this.uEmail.value,this.uPwd.value)
    .subscribe(
      (data)=>{
        console.log("data");
        console.log(data.records[0]);
        if(data.records[0].msgcod===true){
          this.saveUser(data.records[0].Table);
          this.gotohome();
        }
        else
        {
          this.presentAlert("Registro Fallo",data.records[0].msgdes);
        }
      });
  }

   saveUser(user:any){
    console.log(user);
    this.storage.set('user',user);
    console.log()
  }
  gotohome(){
   this.navCtrl.setRoot(HomePage);
  }

  presentAlert(msgtitle,msgdes) {
    let alert = this.alertCtrl.create({
      title: msgtitle,
      subTitle: msgdes,
      buttons: ['Entendido']
    });
    alert.present();
  }
  
   validateform(){
     if(this.uName.value===""){
        this.presentAlert("Registro Fallo","Ingresar Nombre");
        return false;
     }
     if(this.uEmail.value===""){
       this.presentAlert("Registro Fallo","Ingresar correo");
       return false;
     }
     if(this.uPwd.value===""){
       this.presentAlert("Registro Fallo","Ingresar contraseña");
       return false;
     }
     return true;
  }

}
