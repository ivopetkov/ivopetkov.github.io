<?php

/*
 * Advanced PHP
 * Anonymous functions, use as variable and unset
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$sqrt = function($a) {
    return $a * $a;
};

echo $sqrt(2);
unset($sqrt);

/*
Result will be:

4
*/