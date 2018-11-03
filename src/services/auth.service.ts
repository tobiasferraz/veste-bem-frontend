import { Injectable } from "@angular/core";
import { CredenciaisDto } from "../model/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService{
    constructor(public http:HttpClient){}

    authenticate(creds: CredenciaisDto){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{
          observe : 'response',
          responseType : 'text'
        })
    }
}