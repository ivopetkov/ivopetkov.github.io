<?php

/*
 * Advanced PHP
 * Errors as exceptions
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

set_error_handler(function($errorNumber, $errorMessage, $errorFile, $errorLine) {
    throw new \ErrorException($errorMessage, 0, $errorNumber, $errorFile, $errorLine);
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