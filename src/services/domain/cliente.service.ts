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

    return this.http.get<ClienteDto>(`
                                    ${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
 }

 getImageFromBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/veste-bem/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
 }
}