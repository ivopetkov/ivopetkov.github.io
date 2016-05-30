<?php

/*
 * Advanced PHP
 * Anonymous functions, sorting data
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$list = [
    ['name' => 'John', 'age' => 31],
    ['name' => 'Mike', 'age' => 25],
    ['name' => 'Ben', 'age' => 27]
];

usort($list, function($a, $b) {
    if ($a['age'] == $b['age']) {
        return 0;
    }
    return ($a['age'] < $b['age']) ? -1 : 1;
});

print_r($list);

/*
Result will be:

Array
(
    [0] => Array
        (
            [name] => Mike
            [age] => 25
        )

    [1] => Array
        (
            [name] => Ben
            [age] => 27
        )

    [2] => Array
        (
            [name] => John
            [age] => 31
        )
)
*/