<?php

// path to HTML Server Components PHP compiler
// It's available at 
include '../../../html-server-components-php/HTMLServerComponents.php';

// Registers some components so they can be used easily
HTMLServerComponents::register('twitter-share-button', 'components/twitter-share-button.php');
HTMLServerComponents::register('facebook-share-button', 'components/facebook-share-button.php');
HTMLServerComponents::register('linkedin-share-button', 'components/linkedin-share-button.php');

// Proccess the components/main.php component and every other component inside. It's a great time to look at the components/main.php file.
echo HTMLServerComponents::processFile('components/main.php', ["page" => "articles/html-server-components-rock/"]);
