import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDto } from '../../model/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    creds:CredenciaisDto = {
    userName:"",
      senha:""
    };
    constructor(public navCtrl: NavController, public menu: MenuController, public auth : AuthService) {

    }
    ionViewWillEnter() { 
      console.log(this.creds);
      this.menu.swipeEnable(false);   
    } 
  
    ionViewDidLeave() {   
        this.menu.swipeEnable(true);   
      }

    ionViewDidEnter(){
       this.auth.refresh_token().subscribe(response=>{
         this.auth.sucessFulLogin(response.headers.get('Authorization'));
         this.navCtrl.setRoot('CategoriasPage');

        })
    }

  login(){
    this.auth.authenticate(this.creds).subscribe(response =>{
      this.auth.sucessFulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage"); 
    },error=>{

    });
  
  }
}
