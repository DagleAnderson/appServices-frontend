import {Injectable} from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HTTP_INTERCEPTORS} from '@angular/common/http'; 
import {Observable} from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from '../../node_modules/ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldMessage';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storage:StorageService,public alertCtrl:AlertController){

    }
   
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error,cought)=>{

            let errorObj  = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            switch(errorObj.status){
               
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                case 404:
                    this.handle404();
                    break;    
                case 422:
                    this.handle422(errorObj);
                    break;

                    
                default:
                    this.handleDefaultEror(errorObj);    
            }    
            return Observable.throw(errorObj);
        })as any;
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
    
    handle403(){
        this.storage.setLocalUser(null);
    }

    handle404(): any {
        let  alert = this.alertCtrl.create({
            title:'Ops:',
            message:'Nenhum dado foi encontrado!',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj){
        let alert = this.alertCtrl.create({
            title:'422:Erro de validação',
            message:this.listErrors(errorObj.errors),
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        })
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

    listErrors(messages: FieldMessage[]): string {
        let s : string='';
        for(var i =0; i<messages.length; i++){
            s = s+ '<p><strong>' + messages[i].fieldName + '</strong>:' + messages[i].message + '</p>' ; 
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
    

