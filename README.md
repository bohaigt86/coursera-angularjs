# COURSERA-AngularJS
[Coursera resources on Github](https://github.com/jhu-ep-coursera/fullstack-course5)

[AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

## Main Artefacts
  1. [Controllers](#controllers)
  1. [Filters](#filters)
  1. [Services](#services)
  1. [Directives](#directives)
  1. [Components](#components)
  1. [Modules](#modules)

## 1. Controllers
    In AngularJS, a Controller is defined by a JavaScript constructor function that is used to augment the AngularJS Scope.

    We can attach a controller to the DOM using ngController directive. In this way, a new child scope will be created and made available as an injectable parameter to the Controller's construction function as $scope.

    Controllers are used to:
    - set up the initial state of the $scope object
    - add behaviours to the $scope object

### 1.1 Setting Up the Initial State of a $scope Object

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

### 1.2 Adding Behaviour to a $scope Object
    In order to react to events, we need to add behaviour to the scope, by attaching methods to the $scope object.

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

    Any objects assigned to the scope become model properties. Any methods assigned to the scope become available in the view, and can be invoked via AngularJS expressions and ng event handler directives (e.g. ngClick).

### 1.3 Prototypical Inheritance

### 1.4 Controller As Syntax
    Please finish reading the previous section 'Prototypical Inheritance' before you dive into this section.

    'Controller as label' syntax is based on prototypical inheritance, meaning if the controller has been attached using the controller as syntax then the controller instance will be assigned to a property on the scope. The 'label' is a reference to 'this', the instance of the Controller.


    For instance:

    ```html
    <div ng-controller='ParentController as parent'>
      <!-- Any properties or methods added to the $scope now are assigned to $scope.parent -->
      Parent value: {{ parent.value }}
      <div ng-controller='ChildController as child'>
        <!-- Any properties or methods added to the $scope now are assigned to $scope.parent -->
        Child value: {{ child.value }}
        <!-- It is okay to access parent.value even though we put it inside the child controller -->
        Parent value: {{ parent.value }}
      </div>
    </div>
    ```

## 2. Filters
### 2.1 Creating Custom Filters
  Step 1. Create Filter Factory Function

  ```javascript
  function CustomFilterFactory() {
    return function (input) {
      return changeInput;
    };
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

## 3. Services

## 4. Directives
  A directive is a function which executes when the compiler encounters it in the DOM.
  Directives apply special behaviour to attributes and elements in the HTML.

  AngularJS comes with a few built-in directives, like ngBind, ngModel. Take ngBind for instance, its attribute tells AngularJS to replace the text content of the specified HTML element with the value of a given expression, and to update the text content when the value of that expression changes.

  Below are examples of invoking the ng-bind directives:

  ```javascript
  <span ng-bind="exp"></span>
  <span class="ng-bind: exp;"></span>
  <ng-bind></ng-bind>
  ```

### 4.1 Normalization
  AngularJS normalizes an element's tag and attribute name to determine which elements match which directives.

  The normalization process is as follows:

  Strip x- and data- from the front of the element/attributes.
  Convert the \:, \-, or \_-delimited name to camelCase.

  For example, the following forms are all equivalent and match the ngBind directive:

  ```html
  <div ng-controller="Controller">
    Hello <input ng-model='name'> <hr/>
    <span ng-bind="name"></span> <br/>
    <span ng:bind="name"></span> <br/>
    <span ng_bind="name"></span> <br/>
    <span data-ng-bind="name"></span> <br/>
    <span x-ng-bind="name"></span> <br/>
  </div>
  ```

### 4.2 Custom Directives
  - Step 1. Register Directive

  ```javascript
  angular.module('app', [])
  .controller('MyCtrl', MyCtrl)
  .directive('myTag', MyTag); //MyTag is a factory function that returns DDO
  ```

  - Step 2. Define Factory Function
  ```javascript
  MyTag.$inject = [...];
  function MyTag(...) {
    var ddo= {
      templateUrl: template.html
      ...
    };

    return ddo; // Very important to return ddo
  }
  ```

  - Step 3. Use in HTML
  ```html
  <!-- Use normalized name of MyTag-->
  <my-tag></my-tag>
  ```

### 4.3 Directive's Isolate Scope
  To avoid high coupling between a controller and directives, we can implement isolate scope in custom direcrtives. Isolate scope is compulsory in components in AngularJS.

  Directive's default scope is inherited from its parent, which may cause some problem.
  Let's have a look at the following example where the directive hasn't used the isolate scope yet

  ```html
  <!-- index.html -->
  <div ng-controller="MyController1 as ctrl1">
    <my-directive></my-directive>
  </div>

  <div ng-controller="MyController2 as ctrl2">
    <my-directive></my-directive>
  </div>
  ```

  ```javascript
  // app.js
  angular.module('myModule', [])
  .controller('MyController', MyController)
  .directive('myDirective', MyDirective);

  function MyDirective() {
    var ddo = {
      templateUrl: 'mydirective.html',
    }
  }
  ```

  ```html
  <!-- mydirective.html -->
  <div>
    {{ ctrl.item.name }} <!-- it's either ctrl1 or ctrl2, this directive cannot fit in both controllers -->
  </div>
  ```

  We often encounter this situation, so we need to re-architecture our custome directive so it becomes independent from the outer environment. Ideally the outer environment will pass a certain value into it like pass an argument into a function. This is when we need to implement isolate scope.

  ```javascript
  function MyDirective() {
    var ddo = {
      // using a pair of {} to isolate directive scope from the parent scope
      scope: {
        // myProp is the local scope property name,
        //'=' means two-way binding with myProp's normalised name my-prop will be used in the HTML template
        myProp: '='
        // using '@' to bind myAttr to the value of DOM attribute my-attribute
        // '@' means one-way binding
        myAttr: '@'

      },
      ...
    };

    return ddo;
  }
  ```

  ```html
  <my-directive my-prop="outerProper"></my-directive>
  <my-directive my-attr="{{ outerAttribute }}"></my-directive>

  ```

## 5. Components
  In AngularJS, a Component is a special kind of directive that uses a simpler configuration which is suitable for a component-based application structure.

### 5.1 Advantages of Components:
  - simpler configuration than plain directives
  - promote sane defaults and best practices
  - optimised for component-based architecture
  - writing component directives will make it easier to upgrade to Angular 2

## 6. Modules
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

## Important Concepts
  1. [Model-View-ViewModel](#model-view-viewmodel)
  1. [Expressions and Interpolation](#expressions-and-interpolation)
  1. [Scope](#scope)
  1. [Data Binding](#data-binding)
  1. [Digest Cycle](#digest-cycle)
  1. [Dependency Injection](#dependency-injection)
  1. [Compilation](#compilation)

## Model-View-ViewModel
  Model: represents and holds RAW DATA (i.e. data from database or rest api calls from servers )
  - some data may be displayed in the view
  - may contain logic to retrieve data from some source
  - NEVER contains logic associated with displaying the view

  View: user interface
  - in a web app, it just means HTML and CSS
  - only displays the data that it is given
  - NEVER changes the data
  - declaratively broadcast events but never handles them

  ViewModel: representation of the state of the view
  - holds the data displayed in the view
  - NEVER asks the view to display anything
  - responds to view events, aka presentation logic
  - calls for other functionality to handle business logic

## Scope
  - Scope is an object that refers to the application model.
  - Scope is an execution context for expressions.
  - Scopes are arranged in hierarchical structure which mimic the DOM structure of the application.
  - Scopes can watch expressions and propagate events.

  Scope is the glue between app controller and the view. During the compilation linking phase, the directives set up \$watch expressions on the scope. The \$watch allows the directive to be notified of property changes,
  which allows the directive to render the updated value of the DOM element(s).

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
  AngularJS implements two-way data binding. The controller(viewmodel) continuously update changes: any changes to the view are immediately reflected in the model, and any changes in the model are propagated to the view. The view can be regarded as an instant projection of your model. The controller is completely separated from the view and unaware of it.

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

## Digest Cycle
  AngularJS calls digest cycle when users perform some activity that triggers some Angular-aware event (such as ng-click, not like onclick) and model data got changed because of this activity.

  Digest cycle goes through all $scope objects and checks which one(s) got changed because of this activity. Watchers are listeners which are attached to the scope objects and keep watching about the change. They are responsible to synchronise the view with the model, achieving the magical two-way binding.

  As watchers update the view as per the model value change, Digest cycle runs again to check that all the values are synced up. And this extra checking of digest cycle is called 'dirty check'.

  In the cycle, 3 functions are involved at some point. They are \$digest(), \$watch() and \$apply().

  Let's take changing model via ng-model for example:

  - AngularJS calls $digest() to trigger a digest cycle
  - $digest cycle fires all watchers
  - if a watcher finds a change in scope model, the corresponding listener function executes
  - the view gets synchronised with the model

### Understanding $watch()
  It's a best practice to let AngularJS set up watchers for us, for instance, using {{ }} expression/interpolation or ng-model.

  However, we still can manually set up then fire a watcher to understand how it works:

  It will look like this:

  ```javascript
  $scope.$watch(modelData, function (newValue, oldValue) {
    // Synchronise the view with the model
  });
  ```
  The second argument passed to $watch is known as a listener function. It is called whenever the value of modelData changes.

  Below is an example:

  ```javascript
  // Add a property 'num' to the scope
  $scope.num = 0;
  // Add a function that can manipulate the value of 'num'
  $scope.addOne = function () {
    $scope.num++;
  }
  // Set up a watcher on 'num', once its value changes, the listener function gets executed
  $scope.$watch('num', function (newValue, oldValue) {
    console.log('oldValue: ' + oldValue);
    console.log('newValue: ' + newValue);
  });
  // Once addOne() is called to change the value of 'num', console will output:
  // oldValue: 0
  // newValue: 1
  ```

  As mentioned earlier, it is better to let AngularJS set up watchers for us. If we implement interpolation or an expression in the html file, a watcher will be added by AngularJS during compilation.

  ```html
  <div ng-controller="myController">
    <div>
      The number is now: {{ num }}.
    </div>
  </div>
  ```

  If we use a ng-model directive, AngularJS will set up a watcher as well.

  ```html
  <div ng-controller="myController">
    <input type="number" ng-model="num">
  </div>
  ```

### Understanding $apply()
  Now we know a digest cycle is the result of AugularJS' call of \$digest(). However, AngularJS doesn't call \$digest() directly, instead it calls \$scope.\$apply() which in turn calls \$rootScope.\$digest(). As a result of this, a digest cycle starts at the \$rootScope, and subsequently visits all the child scopes calling the watchers along the way.

  Let's have a look at how it works. Under one condition we want to manually trigger the digest cycle: when we want to handle with events that are not Angular-aware, such as onclick or timeout.

  ```javascript
  $scope.num = 0;

  $scope.addOne = function () {
    setTimeout(function () { // The chunk of code of setTimeout is separated from the AngularJS events queue
      $scope.num++;
      $scope.$digest(); // This line is a must to trigger digest cycle
    }, 2000);
  };
  ```
  If we call addOne() in AngularJS context, the digest cycle will not be triggered without \$scope.\$digest(), as AngularJS is not aware of what's happening.

  Instead of calling $digest() directly, here's a better way of doing it:

  ```javascript
  $scope.num = 0;

  $scope.addOne = function () {
    setTimeout(function () { // The chunk of code of setTimeout is separated from the AngularJS events queue
      $scope.$apply(function () { // Manually call $apply() to trigger digest cycle
        $scope.num++;
      });
    }, 2000);
  };
  ```

  A even better way to tackle this problem is to use native AngularJS services, in this case, $timeout.

  ```javascript
  $scope.num = 0;

  $scope.addOne = function () {
    $timeout(function () {
      $scope.num++;
    }, 2000);
  };
  ```

### Further Reading
  - [Understanding Angular's $apply() and $digest()](https://www.sitepoint.com/understanding-angulars-apply-digest/)
  - [Watchers, Digest Cycle And Dirty Check In AngularJS](https://www.c-sharpcorner.com/article/watchers-digest-cycle-and-dirty-check-in-angular/)

## Dependency Injection
  Dependency injection is a technique whereby one object supplies the dependencies of another object. The intent behind dependency injection is to **decouple** objects to the extent that no client code has to be changed simply because an object it depends on needs to be changed to a different one.

  The AngularJS injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested.

## Compilation ([Go to angularjs.org](https://docs.angularjs.org/guide/compiler))
  Compile is an AngularJS service.

  Compilation happens in two phases: compile and link. In the compiling phase, it traverses the DOM and collect all directives and returns a linking function. In the linking phase, it combines the directives with a scope and produce a live view.
