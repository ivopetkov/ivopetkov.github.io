<?php

/*
 * Advanced PHP
 * Anonymous functions, recursion
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$factorial = function($number) use (&$factorial) {
    if ($number < 2) {
        return 1;
    } else {
        return ($number * $factorial($number - 1));
    }
};

echo $factorial(4); // 24

/*
Result will be:

24 - 1*2*3*4
*/