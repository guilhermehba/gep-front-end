function test() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../class-selection.html"
        }
    });
}

test();

function clicked_on_lock(){
    document.getElementById('class_lock').innerHTML = 'https';
}