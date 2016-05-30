<?php

/*
 * Advanced PHP
 * Autoloading classes
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

spl_autoload_register(function ($class) {
    include __DIR__ . '/autoloading-classes-1/' . $class . '.php';
});

$object1 = new Class1();
$object2 = new Class2();

print_r($object1);
print_r($object2);

/*
Result will be:

Class1 Object
(
)
Class2 Object
(
)
*/