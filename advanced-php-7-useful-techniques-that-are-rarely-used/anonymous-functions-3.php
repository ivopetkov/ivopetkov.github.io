<?php

/*
 * 7 PHP Features that are rarely used
 * Anonymous functions
 * http://ivopetkov.com/
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