<?php

/*
 * 7 PHP features that are rarely used
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

register_shutdown_function(function() {
    $errorData = error_get_last();
    if (is_array($errorData)) {
        ob_end_clean();
        echo 'Error occured! - ' . $errorData['message'];
    }
});

ob_start();
echo 5 / 0;

/*
Result will be:

Error occured! - Division by zero

*/