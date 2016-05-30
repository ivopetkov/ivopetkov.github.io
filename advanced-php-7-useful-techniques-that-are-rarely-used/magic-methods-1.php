<?php

/*
 * Advanced PHP
 * Magic methods, constructor
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

class Person
{

    public $age = null;
    public $eyesColor = null;
    public $hairColor = null;
    
    function __construct(){
        $this->age = 20;
        $this->eyesColor = 'blue';
        $this->hairColor = 'brown';
    }

}

$person = new Person();
print_r($person);

/*
Result will be:

Person Object
(
    [age] => 20
    [eyesColor] => blue
    [hairColor] => brown
)

*/