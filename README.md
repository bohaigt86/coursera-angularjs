# COURSERA-AngularJS
[Coursera resouces on Github](https://github.com/jhu-ep-coursera/fullstack-course5)

## Key concepts
  1. [Scope](#scope)
  1. [Dependency Injection](#dependency-injection)
  1. [Directives](#directives)
  1. [Services](#services)
  1. [Components](#components)

## Scope
### Prototypical Inheritance and Scope Inheritance

### Isolate Scope
  Breaks the prototypal inheritance of the scope from the parent.

## Dependency Injection
  Dependency injection is a technique whereby one object supplies the dependencies of another object. The intent behind dependency injection is to **decouple** objects to the extent that no client code has to be changed simply because an object it depends on needs to be changed to a different one.

## Directives
  A directive is a function which excutes when the compiler encounters it in the DOM.
  Directives apply special behaviour to attributes and elements in the HTML.

  ```javascript
  <span ng-bind="exp"></span>
  <span class="ng-bind: exp;"></span>
  <ng-bind></ng-bind>
  ```
### Compilation
  Compile is an AngularJS service.
  Compilation happens in two phases. In the first phase, it traverses the DOM and collect all directives and returns a linking function. In the second phase, it combines the directives with a scope and produce a live view.
