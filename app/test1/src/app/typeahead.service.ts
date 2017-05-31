/**
 * This code adapted from the ng-bootstrap NgbTypeahead directive "Wikipedia search" example:
 * https://ng-bootstrap.github.io/#/components/typeahead
 */

import { Injectable } from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class TypeaheadService {

  constructor(private _jsonp: Jsonp) {}

  search(term: string) {
    if ('' === term) { return Observable.of([]); }

    const url = 'https://en.wikipedia.org/w/api.php';
    const params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this._jsonp.get(url, {search: params}).map(response => <string[]> response.json()[1]);
  }

}
