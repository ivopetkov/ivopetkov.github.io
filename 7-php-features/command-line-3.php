<?php

/*
 * 7 PHP features that are rarely used
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

if (isset($argv[1])) {
    echo "Connecting to " . $argv[1] . "\n";
    $startTime = microtime(true);
    $bytes = strlen(file_get_contents($argv[1]));
    $endTime = microtime(true);
    echo "Downloaded " . $bytes . " bytes in " . number_format($endTime - $startTime, 2)." seconds";
} else {
    echo 'Please enter URL';
}
