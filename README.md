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

  Example from [a stackoverflow article](https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript):

  ```javascript
  /*
    The first pair of parentheses (function(){...}) turns
    the code within (in this case, a function) into an expression
  */
  (function () {

    var msg = "Hello world!";

  })()
  /*
    The second pair of parentheses (function(){...})() calls
    the function that results from that evaluated expression.
  */
  ```

  To throughly understand this design pattern, please read this article: [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) from [benalman.com](http://benalman.com/). Below is the note I made.

  **How functions work in JavaScript**

  When we define a functoin(either by function declaration or by function expression), what we get is an identifier for that function. It can be invoked by putting parentheses behind it.

  ```javascript
    function addOne() {
      var i = 0;

      return function () {
        console.log(++i);
      };
    }

    var plusOne = addOne(); // plushOne() is just a reference to addOne(), i's value is within its own scope
    plusOne(); // 1
    plusOne(); // 2

  ```
  But when a function is created by function expression:

  ```javascript
    var foo = function () {
      /* some code */
    }

    // It is possible to invoke the function like this:
    foo();

    // But not like this:
    function () {
      /* some code */
    }(); // SyntaxError: Unexpected token (
  ```

  This is because when JavaScript sees the keyword **function**, it will not treat it as a function expression but as a function declaration. So it will throw an SyntaxError exception, for function declaration requires a name.

  **How to tackle the problem**

  In order to fix this, we need to tell JavaScript to expect a function expression by wrapping it in parentheses. This is because, in JavaScript, parentheses can't contain statements.

  ```javascript
    /*
      Either of the following two patterns can be used
      to immediately invoke a function expression,
      utilizing the function's execution context to create "privacy."
    */
    (function () {
      /* some code */
    })();

    (function () {
      /* some code */
    }());

  ```
  Also, such parentheses indicate that the function expression will be **immediately** invoked after it is created.

  **Furthur reading**

  - [MDN Guide - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
  - [Function Declaration vs. Function Expression](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
  - [ECMA-262-3 in detail. Chapter 5. Functions.](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses)
  - [MDN Reference - Functions and Functions Scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
