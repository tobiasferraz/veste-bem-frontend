import { Injectable } from "@angular/core";
import { CredenciaisDto } from "../model/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../model/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{
    constructor(public http:HttpClient, public storage:StorageService){}

    authenticate(creds: CredenciaisDto){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{
          observe : 'response',
          responseType : 'text'
        })
    }

    sucessFulLogin(authorization : string){
        let token = authorization.substring(7);
        let user: LocalUser = {
            token:token
        };
        this.storage.setLocaluser(user);
    }

    logout(){
        this.storage.setLocaluser(null);
    }
}