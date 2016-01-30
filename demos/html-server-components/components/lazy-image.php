<html>
    <head>
        <link rel="stylesheet" href="assets/responsivelylazy/responsivelyLazy.min.css">
    </head>
    <body>
        <div class="responsively-lazy" style="padding-bottom:<?php echo 1 / (float) $component->getAttribute('aspectRatio') * 100 ?>%;<?php echo $component->style ?>">
            <img alt="<?php echo $component->alt ?>" src="<?php echo $component->original ?>" srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="<?php echo $component->versions ?>" />
        </div>
        <script async src="assets/responsivelylazy/responsivelyLazy.min.js"></script>
    </body>
</html>