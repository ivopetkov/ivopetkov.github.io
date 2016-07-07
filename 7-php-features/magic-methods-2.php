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
    private $age = null;

    function __set($name, $value)
    {
        if ($name === 'age') {
            if (is_int($value)) {
                $this->age = $value;
            } else {
                throw new \Exception('Invalid age value');
            }
        }
    }

    function __get($name)
    {
        if ($name === 'age') {
            return $this->age;
        }
    }

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
    [age:Person:private] => 25
)

*/