import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GostsService {
  constructor(private http: HttpClient) {
  }

  //получаем на страницу все госты из таблицки, где все госты
  getAllGosts(): Promise<any> {
    return this.http.get(environment.baseUrl + '').toPromise();
  }

  //получаем на стрицу параметры для определенно выбранного госта по названию госта и ИД
  getGostParams(gost: string, id: string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/${gost}/${id}`).toPromise();
  }

  getGostRezb(gost: string, id: string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/rezb/${gost}/${id}`).toPromise();
  }

}
