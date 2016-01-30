<?php

// path to HTML Server Components PHP compiler
// It's available at https://github.com/ivopetkov/html-server-components-compiler
include __DIR__ . '/vendor/autoload.php';

$compiler = new HTMLServerComponentsCompiler();

// Registers some aliases so they can be used easily
$compiler->addAlias('twitter-share-button', 'file:components/twitter-share-button.php');
$compiler->addAlias('facebook-share-button', 'file:components/facebook-share-button.php');
$compiler->addAlias('linkedin-share-button', 'file:components/linkedin-share-button.php');

// Proccess the components/main.php component and every other component inside. It's a great time to look at the components/main.php file.
echo $compiler->processFile('components/main.php', ["page" => "articles/html-server-components-rock/"]);
