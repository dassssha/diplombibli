import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GostsbyrtService {

  constructor(private http: HttpClient) {
  }
  //получаем весь список гостов
  getAllGostsByrt(name:string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/${name}`).toPromise();
  }

  //получаем на стрицу параметры для определенно выбранного госта по названию госта и ИД
  getGostParamsByrt(name:string,gost: string, id: string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/${name}/${gost}/${id}`).toPromise();
  }
  //получаем резьбу
  getGostRezbByr(name:string,gost: string, id: string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/${name}/rezb/${gost}/${id}`).toPromise();
  }
}
