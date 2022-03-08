/* JS for load another html with Resize Window */
function mobile() {
    $(window).on('load resize', function () {
        if ($(window).width() < 950) {
            window.location = "class-selection-page/mobile/class-selection-mobile.html"
        }
    });
}
mobile();
/* JS for load another html with Resize Window - end */
/* alter status for 'diario' */
function clicked_on(){
    document.getElementById('class_lock').innerHTML = 'https';
}
/* alter status for 'diario' - end */
/*count subjects*/
$(function(products_counter){
    var n = parseInt($('.lce_number').text());
    var n_place = $('.lce_number');
    $('.lce_add').live('click', function(){
       $('.lce_number').text(parseInt($('.lce_number').text())+1);
    });
    $('.lce_remove').live('click', function(){
         $('.lce_number').text(parseInt($('.lce_number').text())-1);
    });
});
/*count subjects - end */