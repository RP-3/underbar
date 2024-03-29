/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (array.length < n)
      return array;
    else
      return n === undefined ? array[array.length -1] : array.slice(array.length -n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Object.prototype.toString.call(collection) === "[object Array]") 
      for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
      }
    else
      for (var key in collection) {
      iterator(collection[key], key, collection);
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  // _.filter = function(collection, test) {
  //   var outputArray = [];
  //   for (var i = 0; i < collection.length; i++) {
  //     if (test(collection[i]) === true) {outputArray.push(collection[i]); };
  //   }
  //   return outputArray;
  // };

  _.filter = function(collection, test){ //updated following check-in1. 
    var output = [];
    _.each(collection, function(value, key, collection){
      if (test(value) === true){
        output.push(value);
      }
    });
    return output;
  };

  // Return all elements of an array that don't pass a truth test.
  // _.reject = function(collection, test) {

  //   var noFlyList = _.filter(collection, test);
  //   var outputArray = [];
  //   _.each(collection, function(a) {
  //     if (noFlyList.indexOf(a) < 0) {
  //       outputArray.push(a); 
  //     }
  //   });
      
  //   return outputArray;
  //   // TIP: see if you can re-use _.filter() here, without simply
  //   // copying code in and modifying it
  // };

  _.reject = function(collection, test){ //updated following checkin1
    return _.filter(collection, function(value){
      return !test(value);
    })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqueArray = [];
    for (var i=0; i<array.length; i++) {
      uniqueArray.push(array[i]);
      for (var j=0; j<(uniqueArray.length-1); j++) {
        if (array[i] === uniqueArray[j]) {uniqueArray.pop(); };
      }
    }
    return uniqueArray;
  };

  // _.uniq = function(array){ checkin1 instructor version. revise!
  //   // breadcrumbing
  //   var uniqueObj = {};
  //   _.each(array, function(value, key, collection){
  //     uniqueObj[value] = true;
  //   });
    
  //   return Object.keys(uniqueObj);
  // }


  // Return the results of applying an iterator to each element.
  // _.map = function(array, iterator) {
  //   var results = [];
  //   for (var i=0; i<array.length; i++) {
  //     results.push(iterator(array[i]));
  //   }
  //   return results;
  // };

  _.map = function(input, mapIterator) {
   var output = (Array.isArray(input)) ? [] : {};
   _.each(input, function(currentElement, index, collection){
    output[index] = (mapIterator(currentElement, index, collection));
   });
   return output;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, methodName, args) {
   if (typeof methodName === "function")  {
    var callMethod = function(currentElement, index, collection) {
      return methodName.apply(currentElement, args);
    }
    return _.map(collection, callMethod)
   }
   else {
    var invokeFunc = function(currentElement, index, collection) { 
     return currentElement[methodName].apply(currentElement, args);
    };
   return _.map(collection, invokeFunc);
   }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (!accumulator) {var accumulator = 0;}
    for (var i=0; i<collection.length; i++) {
      accumulator = iterator(accumulator, collection[i]);
    }
    return accumulator;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if (Object.prototype.toString.call(collection) === "[object Array]") 
      for (var i=0; i<collection.length; i++) {
        if (collection.indexOf(target) < 0) {
        return false;
      }
      else {
        return true;
        break
      }
    }

    else
      for (var key in collection) {
      if (key = target) {
        return true;
        break;
      }
      else {
        return false;
      }
    };   
  }; 

    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    // return _.reduce(collection, function(wasFound, item) {
    //   if (wasFound) {
    //     return true;
    //   }
    //   return item === target;
    // }, false);


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
  if (!iterator) {var iterator = _.identity;}
  return _.reduce(collection, function(accumulator, element){
     return (!!iterator(element) && !!accumulator);
  }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // TIP: There's a very clever way to re-use every() here.
 
  _.some = function(collection, iterator){
    if (!iterator) {var iterator = _.identity;}
    var allFalse = _.every(collection, function(value){
      return !iterator(value); 
    }); //modify _.every to test if every element is false
    return !allFalse;  //If it is NOT the case that every element is false, some must be true :)
  }; 



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function() {
    for (var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        arguments[0][key] = arguments[i][key];  
      }
    }
    return arguments[0];

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
   for (var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        if (!arguments[0].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];  
      }
    }
    return arguments[0];

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var memoizeHistory = {};
    
    return function() {
      var funcArgument = Array.prototype.slice.call(arguments);
      if (funcArgument in memoizeHistory) {
        return memoizeHistory[funcArgument];
      } else {
        memoizeHistory[funcArgument] = func(funcArgument);
        return memoizeHistory[funcArgument];
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var funcArguments = Array.prototype.slice.call(arguments); //returns all arguments
    var toPass = funcArguments.slice(2); //returns all arguments but first two
    setTimeout(function(){func.apply(null, toPass);}, wait, toPass);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var duplicateArray = Array.prototype.slice.call(array);
    var output = [];
    for (var i=0; i<duplicateArray.length; i++) {
       var currentIndex = Math.round(Math.random() * duplicateArray.length);
       output.push(duplicateArray[currentIndex]);
       duplicateArray.pop();
    }
    return output;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === "string"){
      return collection.sort(function(a, b){
        return a[iterator] > b[iterator] ? 1 : -1;
      });
    } else{
      return collection.sort(function(a, b){
        return iterator(a) - iterator(b);
      });
    }
  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var max = 0;
    for (var i in arguments){
      if (arguments[i].length > max){ max = arguments[i].length;}
    }

    for (var i=0; i<max; i++){
      var element = [];
      for (var j in arguments){
        element.push(arguments[j][i]);
      }
      result.push(element);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var output = [];

    //recursive array-checker function
    var checkChildren = function(el){
      if (Array.isArray(el) === true){
        for (var i=0; i<el.length; i++){
          checkChildren(el[i]);
        }
      }else{
        output.push(el);
      }
    }

    checkChildren(nestedArray);
    return output;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    var allElements = [];
    //get a complete set of elements
    for (var i=0; i<arguments.length; i++){
      allElements.push(arguments[i].slice());
    }

    allElements = _.flatten(allElements);
    allElements = _.uniq(allElements); //delete duplicates

    for (var i=0; i<allElements.length; i++){ //for each of those elements...
      var currentElement = allElements[i];
      var present = true;
      for (var j=0; j<arguments.length; j++){ //in each of the arguments
        if (arguments[j].indexOf(currentElement) < 0){
          present = false;
        }
      }
      if(present === true){
        result.push(currentElement);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = [];
    var firstArray = _.uniq(array);
    //get a complete set of elements

    for (var i=0; i<firstArray.length; i++){ //for each of those elements...
      var currentElement = firstArray[i];
      var present = false;
      for (var j=1; j<arguments.length; j++){ //in each of the arguments
        if (arguments[j].indexOf(currentElement) > -1){
          present = true;
        }
      }
      if(present === false){
        result.push(currentElement);
      }
    }
    return result;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
