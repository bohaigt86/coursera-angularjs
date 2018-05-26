# COURSERA-AngularJS
[Coursera resouces on Github](https://github.com/jhu-ep-coursera/fullstack-course5)

## Key concepts
  1. [Model-View-ViewModel](#model-view-viewmodel)
  1. [Data Binding](#data-binding)
  1. [Scope](#scope)
  1. [Dependency Injection](#dependency-injection)
  1. [Directives](#directives)
  1. [Modules](#modules)
  1. [Services](#services)
  1. [Components](#components)

## Model-View-ViewModel
  Model: represents and holds RAW DATA (i.e. data from database or rest api calls from servers )
  - some data may be displayed in the view
  - may contain logic to retrieve data from some source
  - NEVER contains log associated with displaying the view

  View: user interface
  - in a web app, it just means HTML and CSS
  - only displays the data that it is given
  - NEVER changes the data
  - declaratively broadcast events but never handels them

  ViewModel: representation of the state of the view
  - holds the data displayed in the view
  - responds to view events, aka presentation logic
  - calls for other functionality to handel business logic
  - NEVER asks the view to display anthing


## Data Binding

## Scope
### Prototypical Inheritance and Scope Inheritance

### Isolate Scope
  Breaks the prototypal inheritance of the scope from the parent.

## Dependency Injection
  Dependency injection is a technique whereby one object supplies the dependencies of another object. The intent behind dependency injection is to **decouple** objects to the extent that no client code has to be changed simply because an object it depends on needs to be changed to a different one.

## Directives
  A directive is a function which excutes when the compiler encounters it in the DOM.
  Directives apply special behaviour to attributes and elements in the HTML.

  Below are examples of invoking the ng-bind directives:

  ```javascript
  <span ng-bind="exp"></span>
  <span class="ng-bind: exp;"></span>
  <ng-bind></ng-bind>
  ```

### Interpolation Directive

### Compilation ([Go to angularjs.org](https://docs.angularjs.org/guide/compiler))
  Compile is an AngularJS service.

  Compilation happens in two phases: comiple and link. In the compiling phase, it traverses the DOM and collect all directives and returns a linking function. In the linking phase, it combines the directives with a scope and produce a live view.

##Modules
  Think of a module as a container of different parts of an app, such as controllers, directives and components.
  Think of a module as the "main function" of your app. It declaratively specify how an app should be bootstrapped.

  ```javascript
  //
  <div ng-app="myApp">
    <div>
      {{ 'World' | greet }}
    </div>
  </div>
  ```

  ```javascript
  // declare a module
  var myAppModule = angular.module('myApp', []);

  // configure the module.
  // in this example we will create a greeting filter
  myAppModule.filter('greet', function() {
    return function(name) {
      return 'Hello, ' + name + '!';
    };
  });
  ```
