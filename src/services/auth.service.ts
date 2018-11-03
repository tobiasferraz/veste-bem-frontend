import { Injectable } from "@angular/core";
import { CredenciaisDto } from "../model/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../model/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService{
    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http:HttpClient, public storage:StorageService){}

    authenticate(creds: CredenciaisDto){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{
          observe : 'response',
          responseType : 'text'
        })
    }

    refresh_token(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},{
            observe : 'response',
            responseType : 'text'
        });
        
    }

    sucessFulLogin(authorization : string){
        let tok = authorization.substring(7);
        let user: LocalUser = {
            token:tok,
            userName:this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocaluser(user);
    }

    logout(){
        this.storage.setLocaluser(null);
    }
}