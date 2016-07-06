<?php

/*
 * 7 PHP Features that are rarely used
 * Command line
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

if (isset($argv[1]) && $argv[1] === '-help') {
    echo 'Enter -name <your-name> so I can greet you properly.';
    exit();
}

if (isset($argv[1], $argv[2]) && $argv[1] === '-name') {
    echo 'Hello, ' . $argv[2];
    exit();
}

echo 'Invalid command. Type -help for help.';
exit();
