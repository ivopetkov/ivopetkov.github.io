<?php

/*
 * 7 PHP features that are rarely used
 * http://ivopetkov.com/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

class Person
{

    public $name = null;
    public $age = null;

}

$person = new Person();
$person->name = 'John';
$person->age = 25;
print_r($person);

/*
Result will be:

Person Object
(
    [name] => John
    [age] => 25
)

*/