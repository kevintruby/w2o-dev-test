/**
 * Primary view component controller. Manages form submission and view state toggle
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api.service';
import { TypeaheadService } from '../typeahead.service';
// below imports necessary for consuming/mutating Observable type responses
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css'],
  providers: [ApiService, TypeaheadService]
})
export class PageFormComponent {
  canDisplayImages: Boolean;
  http: Http;
  images: Object[];
  isBadRequest: Boolean;
  isLoading: Boolean;
  isSearching: Boolean;
  isSearchFailed: Boolean;
  page: string;

  default_page = 'New Jersey';

  constructor(http: Http, private _typeaheadService: TypeaheadService, private _apiService: ApiService) {
    this.canDisplayImages = false;
    this.http = http;
    this.images = [];
    this.isBadRequest = false;
    this.isLoading = false;
    this.isSearching = false;
    this.isSearchFailed = false;
    this.page = this.default_page;
    this.onSubmit();
  }

  itemSelected($event) {
    this.page = $event.item;
    this.onSubmit();
  }

  /**
   * Utilizes ApiService to fetch current images for given page title in user input.
   * Updates page state to show loading/error/success state.
   */
  onSubmit() {
    const params = { titles: this.page };

    this.isLoading = true;
    this.isBadRequest = false;
    this.images = [];

    this._apiService.currentImages(params).subscribe((rsp) => {
      this.images = rsp.images;
      this.isBadRequest = false;
      this.isLoading = false;
      if (!this.page) {
        this.page = this.default_page;
      }
    }, (err) => {
      this.isBadRequest = true;
      this.isLoading = false;
      this.images = [];
      console.log(err);
    });
  }

  toggleImages(): any {
    this.canDisplayImages = !this.canDisplayImages;
  }

  /**
   * Listens to changes in user input to provide page title suggestions.
   *
   * This code adapted from the ng-bootstrap NgbTypeahead directive "Wikipedia search" example:
   * https://ng-bootstrap.github.io/#/components/typeahead
   *
   * @param text$
   */
  wikipediaSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.isSearching = true)
      .switchMap(term =>
        this._typeaheadService.search(term)
          .do(() => this.isSearchFailed = false)
          .catch(() => {
            this.isSearchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.isSearching = false);

}
