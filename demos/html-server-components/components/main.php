<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>HTML Server Components demo</title>
        <style>
            html, body{
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body>
    <component src="file:components/header.php" page="<?php echo $component->page; ?>"/>
    <component src="file:components/body.php" page="<?php echo $component->page; ?>"/>
    <component src="file:components/footer.php"/>
</body>
</html>