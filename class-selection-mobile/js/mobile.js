function isPhone() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../class-selection-mobile.html"
        }
    });
}

isPhone();