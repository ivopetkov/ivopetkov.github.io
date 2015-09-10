<html>
    <head>
        <style>
            .navigation-item{
                padding: 15px;
                padding-left: 20px;
                padding-right: 20px;
                display: inline-block;
                background-color: #eee;
                color: #000;
                text-decoration: none;
                font-family: sans-serif;
                font-size: 14px;
            }
            .navigation-item:not(.selected):hover{
                background-color: #ddd;
            }
            .navigation-item:not(.selected):active{
                background-color: #ccc;
            }
            .selected{
                background-color: #333;
                color: #fff;
            }
        </style>
    </head>
    <body>
        <div style="display: inline-block;">
            <?php
            $items = json_decode($component->items);
            foreach ($items as $id => $text) {
                echo '<a href="#" class="navigation-item' . ($component->selected === $id ? ' selected' : '') . '">' . $text . '</a>';
            }
            ?>
        </div>
    </body>
</html>