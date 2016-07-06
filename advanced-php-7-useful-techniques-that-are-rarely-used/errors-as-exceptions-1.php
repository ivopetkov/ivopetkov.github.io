<?php

/*
 * 7 PHP Features that are rarely used
 * Errors as exceptions
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

set_error_handler(function($number, $message, $file, $line) {
    throw new \ErrorException($message, 0, $number, $file, $line);
});

try {
    echo 5 / 0;
} catch (Exception $e) {
    print_r($e);
}

/*
Result will be:

ErrorException Object
(
    [message:protected] => Division by zero
...
...
...
*/