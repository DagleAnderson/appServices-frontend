import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {ClienteDTO} from "../../models/cliente.dto";
import {API_CONFIG} from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-utl.service";


@Injectable()
export class ClienteService{

    constructor(public http:HttpClient,
                public storage:StorageService,
                public imageUtilService: ImageUtilService){

    }

    findById(id:string){
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/cliente/${id}`);
    }
    
    findByEmail(email:string) : Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/cliente/email?value=${email}`);
    }

    getImageFromBucket(id:string) : Observable<any>{
        let url = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${id}.jpg`
        return this.http.get(url,{responseType:'blob'});
    }

    
    uploadPicture(picture){
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file',pictureBlob,'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/cliente/picture`,
            formData,
            {
                observe:'response',
                responseType:'text'
            }
        )

    }

    insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/cliente`,
            obj,
            {
                observe:'response',
                responseType:'text'
            }
        )
    }
}