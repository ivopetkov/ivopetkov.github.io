<?php

/*
 * 7 PHP Features that are rarely used
 * Anonymous functions
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$sum = function($a, $b) {
    return $a + $b;
};

echo $sum(1, 2); // 3
echo $sum(2, 2); // 4

unset($sum);

/*
Result will be:

3
4
*/