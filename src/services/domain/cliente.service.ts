import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDto } from "../../model/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
 constructor(public http: HttpClient, public storage : StorageService){}

 findByEmail(email: string) : Observable<ClienteDto>{

    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token})
    return this.http.get<ClienteDto>(`
                                    ${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
                                    {'headers':authHeader});
 }

 getImageFromBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/veste-bem/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
 }
}