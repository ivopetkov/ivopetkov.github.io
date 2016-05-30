<?php

/*
 * Advanced PHP
 * Magic methods, validating properties
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

class Person
{

    private $data = [];
    public $eyesColor = null;
    public $hairColor = null;

    function __set($name, $value)
    {
        if ($name === 'age') {
            if (is_int($value) && $value >= 18) {
                $this->data[$name] = $value;
            } else {
                throw new InvalidArgumentException('Age is invalid. Must be at least 18.');
            }
        }
    }

    function __get($name)
    {
        return isset($this->data[$name]) ? $this->data[$name] : null;
    }

    function __isset($name)
    {
        return isset($this->data[$name]);
    }

    function __unset($name)
    {
        if (isset($this->data[$name])) {
            unset($this->data[$name]);
        }
    }

}

$person = new Person();
$person->age = 20;
print_r($person);

/*
Result will be:

Person Object
(
    [data:Person:private] => Array
        (
            [age] => 20
        )

    [eyesColor] => 
    [hairColor] => 
)
*/

echo $person->age;

/*
Result will be:

20
*/

unset($person->age);

/*
Result will be:

null
*/
echo $person->age;