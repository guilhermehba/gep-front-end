function mobile() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "./class-selection-page.html"
        }
    });
}

mobile();