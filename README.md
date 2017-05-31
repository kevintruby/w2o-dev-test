# W2O Group Dev Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

## Problem Definition:

Create a Web display that uses the Wikipedia API to display a list of all current images on the New Jersey Wikipedia page with the username (if any) of the account that uploaded each image.

### Use Notes:

Upon starting the application server in an appropriate environment, the web client bootstraps a single-page Angular v4 application. The client provides an interface for selecting alternative Wikipedia pages to query for imagery, defaulting first to the "New Jersey" value described in above Problem Definition. Results are displayed in a formatted table, with an optional button to toggle the display to a Masonry grid with images lazy-loaded in sequence.

The input for selecting alternative Wikipedia pages makes use of a typeahead suggestion directive that queries the Wikipedia API for search terms. With more time, this should be moved from the client as a JSONP query to the existing back-end API service. The current implementation was mostly borrowed from the [ng-bootstrap typeahead directive](https://ng-bootstrap.github.io/#/components/typeahead) Wikipedia suggestion example.

## Runtime Environment

The application requires a Node.js engine of 7.x and contains a set of Docker files for running an Ubuntu instance configured with OS dependencies installed. Final preparations require `npm install` within the /app/test1 directory for untracked npm dependencies. The optional .env file contains a config setting that can be un-commented for Windows (at least pre-10) support.

The compiled Angular application is tracked in the repo, though this would not be the case in a production environment. The intention is to remove the requirement for `@angular/cli` dependency to run the demonstration.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3200/`. If run through the Docker instance, replace "localhost" with the instance IP address.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. The `npm run build:watch` command allows the application to rebuild the compiled Angular application upon file changes for development purposes.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
