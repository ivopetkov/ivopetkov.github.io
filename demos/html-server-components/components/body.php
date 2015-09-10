<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet' type='text/css'>
        <style>
            .<?php echo $component->id ?>{
                max-width: 700px;
                margin: 0 auto;
                padding-left: 10px;
                padding-right: 10px;
            }
            .<?php echo $component->id ?> h1{
                text-align: center;
                font-family: 'PT Sans Narrow', sans-serif;
                color: #188EB5;
                font-size: 35px;
                padding: 20px;
            }
            .<?php echo $component->id ?> h2{
                text-align: center;
                font-family: 'PT Sans Narrow', sans-serif;
                color: #188EB5;
                font-size: 25px;
                padding: 20px;
                padding-bottom: 0;
                padding-top: 3rem;
            }
            .<?php echo $component->id ?> h3{
                line-height: 180%;
                padding: 2rem;
                padding-top: 1rem;
                padding-bottom: 1rem;
                font-family: sans-serif;
                font-size: 15px;
                text-align: center;
                font-weight: normal;
            }
            .<?php echo $component->id ?> .view-source-button{
                text-align: center;
                padding-top: 1rem;
            }
            .<?php echo $component->id ?> .view-source-button > a{
                text-decoration: none;
                padding: 1rem;
                color: #888;
                font-family: sans-serif;
                font-size: 15px;
            }
            .<?php echo $component->id ?> .view-source-button > a:hover{
                color: #555;
            }
            .<?php echo $component->id ?> .view-source-button > a:active{
                color: #222;
            }
            .<?php echo $component->id ?> a{
                color: #000;
            }
        </style>
    </head>
    <body>
        <div class="<?php echo $component->id ?>">
            <h1>HTML Server Components Rock!</h1>
            <h3>In this page you'll find some HTML Server Components. The source (writen in PHP) is available at <a href="https://github.com/ivopetkov/ivopetkov.github.io/tree/master/demos/html-server-components/" target="_blank">GitHub</a> and details article is posted at <a href="http://ivopetkov.com/b/html-server-components/" target="_blank">ivopetkov.com</a>.</h3>

            <h2>Lazy loaded responive images</h2>
            <div class="view-source-button"><a href="https://github.com/ivopetkov/ivopetkov.github.io/tree/master/demos/html-server-components/components/lazy-image.php" target="_blank">view source</a></div>
            <h3>The following image is lazy loaded using the <a href="https://github.com/ivopetkov/responsively-lazy" target="_blank">Responsively Lazy library</a>.</h3>
            <component file="components/lazy-image.php" style="margin-bottom:1rem;" aspect-ratio="<?php echo 1500 / 1000 ?>" src="images/1500.jpg" versions="images/500.jpg 500w, images/700.jpg 700w, images/1000.jpg 1000w, images/1500.jpg 1500w"/>

            <h2>Carousel</h2>
            <div class="view-source-button"><a href="https://github.com/ivopetkov/ivopetkov.github.io/tree/master/demos/html-server-components/components/carousel.php" target="_blank">view source</a></div>
            <h3>The following carousel is build with <a href="http://www.owlcarousel.owlgraphic.com/" target="_blank">Owl Carousel 2</a>.</h3>
            <component file="components/carousel.php" margin="10">
                <div style="color:#fff;font-family:Arial;font-size:50px;line-height:200px;text-align:center;width:100%;height:200px;background-color:#3CB0D6;">1</div>
                <div style="color:#fff;font-family:Arial;font-size:50px;line-height:200px;text-align:center;width:100%;height:200px;background-color:#2996BA;">2</div>
                <div style="color:#fff;font-family:Arial;font-size:50px;line-height:200px;text-align:center;width:100%;height:200px;background-color:#1E84A6;">3</div>
                <div style="color:#fff;font-family:Arial;font-size:50px;line-height:200px;text-align:center;width:100%;height:200px;background-color:#146E8C;">4</div>
                <div style="color:#fff;font-family:Arial;font-size:50px;line-height:200px;text-align:center;width:100%;height:200px;background-color:#0E5A73;">5</div>
            </component>

            <h2>Comment box</h2>
            <div class="view-source-button"><a href="https://github.com/ivopetkov/ivopetkov.github.io/tree/master/demos/html-server-components/components/disqus-comments.php" target="_blank">view source</a></div>
            <h3 class="text">This <a href="https://disqus.com/" target="_blank">Disqus</a> comments box created only by providing a short name.</h3>
            <component file="components/disqus-comments.php" short-name="ivopetkovgithubio"/>

            <h2>Social buttons</h2>
            <div class="view-source-button"><a href="https://github.com/ivopetkov/ivopetkov.github.io/tree/master/demos/html-server-components/components/social-buttons.php" target="_blank">view source</a></div>
            <h3 class="text">Here we've got one social buttons component that uses three other components.</h3>
            <div style="text-align:center;">
                <component file="components/social-buttons.php" url="http://ivopetkov.com/b/html-server-components/"/>
            </div>
        </div>
    </body>
</html>