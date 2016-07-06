<?php

/*
 * Advanced PHP
 * Anonymous functions, adding variables to the scope
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$count = 0;

$sum = function($a, $b) use (&$count) {
    $count++;
    return $a + $b;
};

echo $sum(1, 2); // 3 
echo $sum(2, 2); // 4

echo $count; // 2

/*
Result will be:

3
4
2
*/