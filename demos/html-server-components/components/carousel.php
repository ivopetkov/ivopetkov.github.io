<?php
$id = 'c' . uniqid();
?><html>
    <head>
        <link rel="stylesheet" href="assets/owlcarousel/assets/owl.carousel.css" />
    </head>
    <body>
        <div class="<?php echo $id ?> owl-theme">
            <?php echo $component->innerHTML; ?>
        </div>
        <script src="assets/jquery/jquery.min.js"></script>
        <script src="assets/owlcarousel/owl.carousel.min.js"></script>
        <script>
            $(document).ready(function () {
                $('.<?php echo $id ?>').owlCarousel(
                        {
                            margin:<?php echo $component->getAttribute('margin', 0) ?>,
                            responsiveClass: true,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                300: {
                                    items: 2
                                },
                                600: {
                                    items: 3
                                }
                            }
                        }
                );
            });
        </script>
    </body>
</html>