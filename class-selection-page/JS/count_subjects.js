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