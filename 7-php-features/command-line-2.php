<?php

/*
 * 7 PHP features that are rarely used
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

if (isset($argv[1])) {
    if (is_dir($argv[1])) {
        $files = scandir($argv[1]);
        foreach ($files as $file) {
            echo "- " . $file . "\n";
        }
        echo (sizeof($files) - 2) . " files listed";
    } else {
        echo 'Invalid dirname';
    }
} else {
    echo 'Please enter dirname';
}
