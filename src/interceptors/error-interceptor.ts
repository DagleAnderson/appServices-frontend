import {Injectable} from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HTTP_INTERCEPTORS} from '@angular/common/http'; 
import {Observable} from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from '../../node_modules/ionic-angular/components/alert/alert-controller';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storage:StorageService,public alertCtrl:AlertController){

    }
   
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        console.log("passou");
        return next.handle(req)
        .catch((error,cought)=>{

            let errorObj  = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                    
                default:
                    this.handleDefaultEror(errorObj);    
            }    
            return Observable.throw(errorObj);
        })as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let  alert = this.alertCtrl.create({
            title:'Erro 401:falha de autenticação',
            message:'Email ou senha incorretos',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultEror(errorObj){
        let  alert = this.alertCtrl.create({
            title:'Erro' + errorObj.status + ':'+errorObj.error,
            message:errorObj.message,
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
    

