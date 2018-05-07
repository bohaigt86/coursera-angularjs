# COURSERA-AngularJS
[Coursera resouces on Github](https://github.com/jhu-ep-coursera/fullstack-course5)

## Week 1 Notes
### Key concepts

  1. [Model-View-ViewModel](#mvvm)
  1. [Dependency Injection](#dependency-injection)
  1. [Directives](#directives)
  1. [Services](#services)

  1. [IIFE](#iife)

### Dependency Injection
  <a name="dependency-injection"></a><a name="Dependency Injection"></a>
  [Dependency injection](#dependency-injection) is a technique whereby one object supplies the dependencies of another object. The intent behind dependency injection is to **decouple** objects to the extent that no client code has to be changed simply because an object it depends on needs to be changed to a different one.

### IIFE
  IIFE stands for [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), which is a JavaScript function runs as soon as it is defined.

  IIFE is actually a design pattern containing two major parts. The first is the anonymous function with lexical scope enclosed within the Grouping Operator (), which prevents accessing variables within the IIFE idiom as well as polluting the global scope.

  The second part is creating the immediately executing function expression (), through which the JavaScript engine will directly interpret the function.

  ```javascript
  (function () { //The first pair of parentheses (function(){...}) turns the code within (in this case, a function) into an expression

    return "Hello world!"

  })() //the second pair of parentheses (function(){...})() calls the function that results from that evaluated expression.


  ```
