/* JS for load another html with Resize Window */
/*
function test() {
    $(window).on('load resize', function () {
        if ($(window).width() < 950) {
            window.location = "mobile/class-selection-mobile.html"
        }
    });
}

test();
*/

/* JS for load another html with Resize Window - end */
/* alter status for 'diario' */
function clicked_on_lock(){
    document.getElementById('class_lock').innerHTML = 'https';
}
/* alter status for 'diario' - end */

/* filter test */
function myFunction() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body #teacher");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
