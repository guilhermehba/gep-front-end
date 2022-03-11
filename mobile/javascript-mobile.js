function isPhone() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../attendance-page.html"
        }
    });
}

isPhone();