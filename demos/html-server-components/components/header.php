<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet' type='text/css'>
    </head>
    <body>
        <header>
            <div style="text-align: center;padding-top:50px;padding-bottom:20px;font-size:50px;font-family: 'PT Sans Narrow', sans-serif;">Ivo Petkov</div>
            <div style="text-align: center;padding-bottom:70px;font-size:15px;font-family: sans-serif;">personal demo website created with HTML Server Components</div>

            <?php
            $pageParts = explode('/', $component->page);

            $navigationItems = [];
            $navigationItems['about-me'] = 'About me';
            $navigationItems['articles'] = 'Articles';
            $navigationItems['podcast'] = 'Podcast';
            $navigationItems['events'] = 'Events';
            $navigationItems['contact-me'] = 'Contact me';
            ?>
            <div style="text-align: center;padding-bottom:30px;">
                <component src="file:components/navigation.php" selected="<?php echo $pageParts[0] ?>" items="<?php echo htmlentities(json_encode($navigationItems)) ?>">
            </div>
        </header>
    </body>
</html>