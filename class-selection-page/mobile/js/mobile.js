function test() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../index.html"
        }
    });
}

test();

function clicked_on_lock(){
    document.getElementById('class_lock').innerHTML = 'https';
}