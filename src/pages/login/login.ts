import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { AuhtProvider } from '../../providers/auht/auht';
import { HomePage } from '../home/home';


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
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
              public auhtProvider:AuhtProvider,private alertCtrl: AlertController) {

     
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginApp(){
    //this.presentAlert(); return;
    if(this.validateform()===false) return; // vaidamos los campos del formulario
    this.auhtProvider.login(this.username.value,this.password.value)
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

  saveUser(user:any){
    console.log(user);
    this.storage.set('user',user);
    console.log()
  }
  gotohome(){
   this.navCtrl.setRoot(HomePage);
  }

  validateform(){
     if(this.username.value===""){
        this.presentAlert("Ingreso Fallo","Ingresar Nombre");
        return false;
     }
     if(this.password.value===""){
       this.presentAlert("Ingreso Fallo","Ingresar correo");
       return false;
     }
     return true;
  }
 
   
}
