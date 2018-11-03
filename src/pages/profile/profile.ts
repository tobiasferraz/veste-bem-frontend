import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDto } from '../../model/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName : string;
  cliente : ClienteDto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : StorageService, public clienteService :ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser){
      this.clienteService.findByEmail(localUser.userName).subscribe(response =>{
          this.cliente = response;
          this.getImageIfExists();
        }, error=>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }

  }
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response =>{
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/veste-bem/cp${this.cliente.id}.jpg`;
    }, error=>{
     
    }); 
  }

}
