import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(public storage : StorageService){}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        let localUser = this.storage.getLocalUser();
        
        if(localUser && req.url.includes(API_CONFIG.baseUrl)){
            let tokenCompleto = 'Bearer '+localUser.token;
           
            const  authReq = req.clone(
                {headers : req.headers.set('Authorization', tokenCompleto)});
                return next.handle(authReq)
        }
        return next.handle(req)
        
    }
}

export const AuthInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
};