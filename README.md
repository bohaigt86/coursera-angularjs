# COURSERA-AngularJS
[Coursera resouces on Github](https://github.com/jhu-ep-coursera/fullstack-course5)

## Key concepts
  1. [Model-View-ViewModel](#model-view-viewmodel)
  1. [Controllers](#controllers)
  1. [Scope](#scope)
  1. [Expressions and Interpolation](#expressions-and-interpolation)
  1. [Data Binding](#data-binding)
  1. [Dependency Injection](#dependency-injection)
  1. [Filters](#filters)
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
  - NEVER asks the view to display anything
  - responds to view events, aka presentation logic
  - calls for other functionality to handel business logic

## Controllers
  In AngularJS, a Controller is defined by a JavaScript constructor function that is used to augment the AngularJS Scope.

  We can attach a controller to the DOM using ngController directive. In this way, a new child scope will be created and made available as an injectable parameter to the Controller's construction function as $scope.

  Controllers are used to:
  - set up the initial state of the $scope object
  - add behaviours to the $scope object

### Setting up the initial state of a $scope object

  ```javascript
  var myApp = angular.module('myApp',[]); //create an module for our application

  myApp.controller('GreetingController', ['$scope', function($scope) { //add the controller's constructor function to the module using .controller()
    $scope.greeting = 'Hola!';
  }]);
  ```
  Attaching the controller's constructor function to the module keeps it out of the global scope.

  Attach the controller to the DOM using the ng-controller directive, so the greeting property can data-bound to the template.

  ```html
  <div ng-controller="GreetingController">
  {{ greeting }}
  </div>
  ```
### Adding Behavior to a Scope Object
  In order to react to events, we need to add behavior to the scope, by attaching methods to the $scope object.

  The following example uses a Controller to add a method, which doubles a number, to the scope:

  ```javascript
  var myApp = angular.module('myApp',[]);

  myApp.controller('DoubleController', ['$scope', function($scope) {
    $scope.double = function(value) { return value * 2; };
  }]);
  ```

  ```html
  <div ng-controller="DoubleController">
    Two times <input ng-model="num"> equals {{ double(num) }}
  </div>
  ```

  Any objects assgined to the scope become model properties. Any methods assigned to the scope becaome available in the view, and can be invoked via AngularJS expressions and ng event handler directives (e.g. ngClick).

## Scope
  - Scope is an object that refers to the application model.
  - Scope is an execution context for expressions.
  - Scopes are arranged in hierarchical structure which mimic the DOM structure of the application.
  - Scopes can watch expressions and propagate events.

  Scope is the glue between app controller and the view. During the compilation linking phase, the directives set up \$watch expressions on the scope. The \$watch allows the directive to be notified of property changes,
  which allows the directive to render the updated value of the DOM elememt(s).

  Both controllers and directives have reference to the scope, but not to each other. This arrangement isolates the controller from the directive as well as from the DOM. This is an important point since it makes the controllers view agnostic, which greatly improves the testing story of the applications.

### Scope characteristics
  - Scopes provide APIs ($watch) to observe model mutations.

  - Scopes provide APIs ($apply) to propagate any model changes through the system into the view from outside of the "AngularJS realm" (controllers, services, AngularJS event handlers).

  - Scopes can be nested to limit access to the properties of application components while providing access to shared model properties. Nested scopes are either "child scopes" or "isolate scopes". A "child scope" (prototypically) inherits properties from its parent scope. An "isolate scope" does not. See isolated scopes for more information.

  - Scopes provide context against which expressions are evaluated. For example {{username}} expression is meaningless, unless it is evaluated against a specific scope which defines the username property.

### Prototypical Inheritance and Scope Inheritance

### Isolate Scope
  Breaks the prototypal inheritance of the scope from the parent.

## Expressions and Interpolation
  - Expressions are evaluated against a scope object. They are tied to the scope they are in.
  - Expression evaluation don't throw ReferenceError or TypeError.
  - Can use filter with in an expression to format data before displaying it.
  - Can not use control flow statements.

  AngularJS interpolation replaces expressions in a string with values.

## Data Binding
  AngularJS implements two-way data binding. The controller(viewmodel) continuously update changes: any changes to the view are immediately reflected in the model, and any changes in the model are propagated to the view. The view can be regarded as an instant projection of your model. The controller is completedly seperated from the view and unaware of it.

  Below shows how to bind the controller to the view.

  ```html
  <!DOCTYPE html>
  <html ng-app="myFirstApp">
    <head>
      <meta charset="utf-8">
      <script src="angular.min.js"></script>
      <script src="app.js"></script>
      <title>My first AngularJS App</title>
    </head>
    <body>
      <div ng-controller="MyFirstController">

      </div>
    </body>
  </html>
  ````

  ```javascript
  (function () { // use iife to prevent local variables from polluting the global scope
  'use strict'; //avoid careless mistakes

  angular.module('myFirstApp', []) //bound to DOM tree in the html file

  .controller('MyFirstController', function () { //controller is how we define viewmodel

  });

  })();
  ```


## Dependency Injection
  Dependency injection is a technique whereby one object supplies the dependencies of another object. The intent behind dependency injection is to **decouple** objects to the extent that no client code has to be changed simply because an object it depends on needs to be changed to a different one.

  The AngularJS injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested.

## Filters

### Creating Custom Filters
  Step 1. Create Filter Factory Function

  ```javascript
  function CustomFilterFactory() {
    return function (input) {
      return changeInput;
    }
  }
  ```

  Step 2. Register Filter Factory With Module

  ```javascript
  angular.module('app', [])
  .controller('ctrl', Ctrl)
  .filter('custom', CustomFilterFactory);
  ```

  Step 3. Inject It With nameFilter

  ```javascript
  Ctrl.$inject('$scope', 'customFilter');
  
  function Ctrl($scope, customFilter) {
    var msg = "some input";
    customFilter(msg);
  }
  ```

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

## Modules
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
