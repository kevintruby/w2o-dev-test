/**
 * Interface that can be extended for all back-end API access
 */
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  base_url = '/api';

  constructor(private http: Http) { }

  /**
   * Sends page title parameter to back-end to fetch data on all images present to
   * matched pages.
   *
   * @param params
   * @returns {Observable<R|T>}
   */
  currentImages(params: Object = {}) {
    const url = `${this.base_url}/currentImages`;
    return this.http.post(url, params)
      .map(res => {
        return res.json();
      }).catch((err: any) => {
        return Observable.throw(err.json().error || 'Server error');
      });
  }

}
