<?php

/*
 * Advanced PHP
 * http://ivopetkov.com/b/advanced-php/
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */


function sum($a, $b)
{
    return $a + $b;
}

echo sum(1, 2); // 3
echo sum(2, 2); // 4




$sum = function($a, $b) {
    return $a + $b;
};

echo $sum(1, 2); // 3
echo $sum(2, 2); // 4

unset($sum);




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

$person = new class{

    public $age = null;

    public function getAge()
    {
        return $this->age;
    }

};

$person->age = 25;
echo $person->getAge(); // 25




include "some/dir/Class1.php";
include "some/dir/Class2.php";

$object1 = new Class1();
$object2 = new Class2();




spl_autoload_register(function($class) {
    include "some/dir/" . $class . ".php";
});

$object1 = new Class1();
$object2 = new Class2();




error_reporting(E_ERROR | E_WARNING | E_PARSE);

ini_set('display_errors', '1');

$content = @file_get_contents('http://...');

set_error_handler("myErrorHandler");





set_error_handler(function($number, $message, $file, $line) {
    throw new \ErrorException($message, 0, $number, $file, $line);
});

try {
    echo 5 % 0;
} catch (Exception $e) {
    print_r($e);
}

class Person
{

    public $name = null;
    public $age = null;

}

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
                throw new InvalidArgumentException('Age is invalid. Must be integer.');
            }
        }
    }

    function __get($name)
    {
        return $this->age;
    }

}



__construct()
__destruct()

__call()
__callStatic()

__get()
__set()
__isset()
__unset()

__sleep()
__wakeup()

__toString()
__invoke()
__set_state()
__clone()
__debugInfo()









register_shutdown_function(function() {
    $data = error_get_last();
    if (is_array($data)) {
        ob_end_clean();
        echo 'Error occurred! - ' . $data['message'];
    }
});




php hello.php John

if (isset($argv[1])) {
    echo 'Hello, ' . $argv[1];
} else {
    echo 'Please enter your name as first argument';
}