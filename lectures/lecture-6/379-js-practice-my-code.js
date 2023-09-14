/**
 * SI 379: JavaScript Practice
 * 
 * Load "379-js-practice-tests.html" in your browser to view the results.
 */

/**
 * Define `addOne` as a function that expects one argument (a number)
 * and returns that argument's value plus one.
 */

function addOne(x) {
    return x++;
}


/**
 * Define `largest` as a function that expects one argument (an array of numbers)
 * and returns the largest item in that array.
 */

function largest(lst) {
    let lrg = lst[0];
    for x in lst {
        if x > lrg {
            lrg = x;
        }

    }
    return lrg;
    
}

/**
 * The *factorial* of a number n is denoted as: n! === n * (n-1) * (n-2) * ... * 1
 * 
 * For example, 4! === 4 * 3 * 2 * 1 === 24
 * Another example: 6! === 6 * 5 * 4 * 3 * 2 * 1 === 720
 * 
 * Define a function `fact` that accepts one argument (a positive integer n) and returns n!
 * 
 * Note: 0! is 1
 */

function fact(n) {
   for (let i = 1; i<=n; i++) {
    mult = x * n
   }
   return mult;
}