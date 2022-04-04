

function deleteClass() {

    swal({
        title: "Tem certeza quer quer excluir?",
        text: "Se você escluir essa aula poderá incluí-lo novamente quando quiser selecionando-a no calendário",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Sua aula foi excluído!", {
                    icon: "success",
                });
            } else {
                swal("Operação cancelada!");
            }
        });

}

var data = new Date();
var dataFormat = data.toISOString().split('T')[0];

function dataNow() {
    var x = document.querySelector(".selected-date");
    x.setAttribute("value", dataFormat);
}

$(document).ready(function () {

    $('.input-daterange').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        calendarWeeks: true,
        clearBtn: true,
        disableTouchKeyboard: true
    });

});

var selected = [];
var selected_year = [];
var yearOne;
var yearTwo;
var monthOne;
var monthTwo;
var AllDaysSelected = []; // array do tipo Date
var AllDaysSelectedValues = []; // array do tipo String com os valores das datas
var daySelected;

var diasRemovidos = [];

var dateStartBimestre = new Date("2022", "01", "25");
var dateEndBimestre = new Date("2022", "03", "30");

var lastClick = false;
var secondClickUnic;

var arrayThis = [];
var arrayThis2 = [];

// calendário
function calendar() {
    (function ($) {

        "use strict";

        $(document).ready(function () {
            function c(passed_month, passed_year, calNum) {
                var calendar = calNum == 0 ? calendars.cal1 : calendars.cal2;
                makeWeek(calendar.weekline);
                calendar.datesBody.empty();
                var calMonthArray = makeMonthArray(passed_month, passed_year);
                var r = 0;
                var u = false;
                while (!u) {
                    if (daysArray[r] == calMonthArray[0].weekday) { u = true }
                    else {
                        calendar.datesBody.append('<div class="blank"></div>');
                        r++;
                    }
                }
                for (var cell = 0; cell < 42 - r; cell++) { // 42 date-cells in calendar
                    if (cell >= calMonthArray.length) {
                        calendar.datesBody.append('<div class="blank"></div>');
                    } else {
                        var shownDate = calMonthArray[cell].day;
                        // Later refactiroing -- iter_date not needed after "today" is found
                        var iter_date = new Date(passed_year, passed_month, shownDate);
                        if (
                            (
                                (shownDate != today.getDate() && passed_month == today.getMonth())
                                || passed_month != today.getMonth()
                            )
                            && iter_date < dateStartBimestre || iter_date > dateEndBimestre) {
                            console.log("today: " + today);
                            var m = '<div class="past-date">'; //var m = '<div class="past-date">';
                        } else {
                            var m = checkToday(iter_date) ? '<div class="today">' : "<div class='p"+shownDate+passed_month+passed_year+"'>";
                        }
                        calendar.datesBody.append(m + shownDate + "</div>");
                        //calendar.datesBody.append("<span class='p"+shownDate+passed_month+passed_year+"'>"+m + shownDate + "</div></span>");
                    }
                }

                calendar.datesBody.find(".p1522022").each(function () {
                    $(this).addClass("bg-success");
                });

                var t1;
                var t2;
                var t3;

                for (const key in AllDaysSelected) {
                    t1 = AllDaysSelected[key].getDate();
                    t2 = AllDaysSelected[key].getMonth();
                    t3 = AllDaysSelected[key].getFullYear();

                    calendar.datesBody.find(`.p${t1}${t2}${t3}`).each(function () {
                        $(this).addClass("selected");
                    });
                }

                // var color = o[passed_month];
                calendar.calHeader.find("h2").text(i[passed_month] + " " + passed_year);

                //console.log(calendar.calHeader.find("h2").textContent);
                //.css("background-color",color)
                //.find("h2").text(i[passed_month]+" "+year);

                // find elements (dates) to be clicked on each time
                // the calendar is generated

                //clickedElement = bothCals.find(".calendar_content").find("div");
                var clicked = false;
                selectDates(selected);

                // importante
                clickedElement = calendar.datesBody.find('div');
                clickedElement.on("click", function () {
                    clicked = $(this);
                    if (clicked.hasClass('past-date')) { return; }
                    var whichCalendar = calendar.name;

                    //console.log("show me " + whichCalendar + " click");
                    // Understading which element was clicked;
                    // var parentClass = $(this).parent().parent().attr('class');
                    if (firstClick && secondClick) {
                        thirdClicked = getClickedInfo(clicked, calendar);
                        var firstClickDateObj = new Date(firstClicked.year,
                            firstClicked.month,
                            firstClicked.date);
                        var secondClickDateObj = new Date(secondClicked.year,
                            secondClicked.month,
                            secondClicked.date);
                        var thirdClickDateObj = new Date(thirdClicked.year,
                            thirdClicked.month,
                            thirdClicked.date);
                        if (secondClickDateObj > thirdClickDateObj
                            && thirdClickDateObj > firstClickDateObj) {
                            secondClicked = thirdClicked;
                            // then choose dates again from the start :)
                            bothCals.find(".calendar_content").find("div").each(function () {
                                $(this).removeClass("selected");
                            });
                            selected = {};
                            selected[firstClicked.year] = {};
                            selected[firstClicked.year][firstClicked.month] = [firstClicked.date];
                            selected = addChosenDates(firstClicked, secondClicked, selected);
                        } else { // reset clicks
                            selected = {};
                            firstClicked = [];
                            secondClicked = [];
                            firstClick = false;
                            secondClick = false;
                            bothCals.find(".calendar_content").find("div").each(function () {
                                $(this).removeClass("selected");
                            });
                        }
                    }

                    // se for de tal data, até tal data trocar false para true
                    // exemplo: se true, ao clicar no dia 8 e no dia 12, 
                    // vão ser selecionados o dia 8,9,10,11 e 12
                    if (false) {
                        if (!firstClick) {
                            firstClick = false;
                            firstClicked = getClickedInfo(clicked, calendar);
                            console.log(firstClicked);
                            var dataDays = new Date(firstClicked['year'], firstClicked['month'], firstClicked['date']);
                            AllDaysSelected.push(dataDays);
                            daySelected = dataDays;
                            drawingListClasses(dataDays.toLocaleDateString());
                            $(this).addClass('selected');
                            selected[firstClicked.year] = {};
                            selected[firstClicked.year][firstClicked.month] = [firstClicked.date];
                        } else {
                            secondClick = true;
                            secondClicked = getClickedInfo(clicked, calendar);
                            console.log("secondClicked: ");
                            console.log(secondClicked);

                            // what if second clicked date is before the first clicked?
                            var firstClickDateObj = new Date(firstClicked.year,
                                firstClicked.month,
                                firstClicked.date);
                            var secondClickDateObj = new Date(secondClicked.year,
                                secondClicked.month,
                                secondClicked.date);

                            if (firstClickDateObj > secondClickDateObj) {

                                var cachedClickedInfo = secondClicked;
                                secondClicked = firstClicked;
                                firstClicked = cachedClickedInfo;
                                selected = {};
                                selected[firstClicked.year] = {};
                                selected[firstClicked.year][firstClicked.month] = [firstClicked.date];

                            } else if (firstClickDateObj.getTime() ==
                                secondClickDateObj.getTime()) {
                                selected = {};
                                firstClicked = [];
                                secondClicked = [];
                                firstClick = false;
                                secondClick = false;
                                $(this).removeClass("selected");
                            }


                            // add between dates to [selected]
                            selected = addChosenDates(firstClicked, secondClicked, selected);
                        }
                    }

                    if (lastClick == false) {
                        firstClicked = getClickedInfo(clicked, calendar);
                        //console.log(firstClicked);
                        var dataDays = new Date(firstClicked['year'], firstClicked['month'], firstClicked['date']);
                        daySelected = dataDays;

                        if (AllDaysSelectedValues.includes(daySelected.toLocaleDateString())) {
                            // se tiver no array remove
                            //$(this).removeClass("selected");

                            AllDaysSelected.push(daySelected); // adiciona no array do tipo Date

                            AllDaysSelectedValues.push(daySelected.toLocaleDateString()); // adiciona no array do tipo String com os valores das datas


                            //var chave = AllDaysSelectedValues.indexOf(daySelected.toLocaleDateString());
                            //AllDaysSelectedValues.splice(chave, 1);

                            //remotarLista();
                        } else {
                            //se não tiver no array adicionar

                            AllDaysSelected.push(daySelected); // adiciona no array do tipo Date

                            AllDaysSelectedValues.push(daySelected.toLocaleDateString()); // adiciona no array do tipo String com os valores das datas

                            console.log("adicionado dia!");
                            $(this).addClass('selected');

                        }

                        drawingListClasses();
                        ativarBotao();
                    } else {
                        // add between dates to [selected]
                        selected = addChosenDates(firstClicked, secondClicked, selected);
                    }
                    //console.log(selected);
                    //selectDates(selected);
                });

            }
            function selectDates(selected) {
                if (!$.isEmptyObject(selected)) {
                    var dateElements1 = datesBody1.find('div');
                    var dateElements2 = datesBody2.find('div');

                    function highlightDates(passed_year, passed_month, dateElements) {
                        if (passed_year in selected && passed_month in selected[passed_year]) {
                            var daysToCompare = selected[passed_year][passed_month];
                            // console.log(daysToCompare);
                            for (var d in daysToCompare) {
                                dateElements.each(function (index) {
                                    if (parseInt($(this).text()) == daysToCompare[d]) {
                                        $(this).addClass('selected');
                                    }
                                });
                            }

                        }
                    }

                    highlightDates(year, month, dateElements1);
                    highlightDates(nextYear, nextMonth, dateElements2);
                    yearOne = year;
                    yearTwo = nextYear;
                    monthOne = month;
                    monthTwo = nextMonth;
                    // selected_year = [`${year}-${month}-${dateElements1}`];
                    // selected_year = [dateElements1];
                    console.log(`Adiciona em days ${selected}`);
                }
            }

            function makeMonthArray(passed_month, passed_year) { // creates Array specifying dates and weekdays
                var e = [];
                for (var r = 1; r < getDaysInMonth(passed_year, passed_month) + 1; r++) {
                    e.push({
                        day: r,
                        // Later refactor -- weekday needed only for first week
                        weekday: daysArray[getWeekdayNum(passed_year, passed_month, r)]
                    });
                }
                return e;
            }
            function makeWeek(week) {
                week.empty();
                for (var e = 0; e < 7; e++) {
                    week.append("<div>" + daysArray[e].substring(0, 3) + "</div>")
                }
            }

            function getDaysInMonth(currentYear, currentMon) {
                return (new Date(currentYear, currentMon + 1, 0)).getDate();
            }
            function getWeekdayNum(e, t, n) {
                return (new Date(e, t, n)).getDay();
            }
            function checkToday(e) {
                var todayDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                var checkingDate = e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate();
                return todayDate == checkingDate;

            }
            function getAdjacentMonth(curr_month, curr_year, direction) {
                var theNextMonth;
                var theNextYear;
                if (direction == "next") {
                    theNextMonth = (curr_month + 1) % 12;
                    theNextYear = (curr_month == 11) ? curr_year + 1 : curr_year;
                } else {
                    theNextMonth = (curr_month == 0) ? 11 : curr_month - 1;
                    theNextYear = (curr_month == 0) ? curr_year - 1 : curr_year;
                }
                return [theNextMonth, theNextYear];
            }
            function b() {
                today = new Date;
                year = today.getFullYear();
                month = today.getMonth();
                var nextDates = getAdjacentMonth(month, year, "next");
                nextMonth = nextDates[0];
                nextYear = nextDates[1];
            }

            var e = 480;

            var today;
            var year,
                month,
                nextMonth,
                nextYear;

            //var t=2013;
            //var n=9;
            var r = [];
            var i = ["Janeiro", "fevereiro", "Março", "Abril", "Maio",
                "Junho", "Julho", "Agosto", "Setembro", "Outubro",
                "Novembro", "dezembro"];
            var daysArray = ["Domingo", "Segunda", "Terça",
                "Quarta", "Quinta", "Sexta", "Sábado"];
            var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60",
                "#FF6860", "#f39c12", "#f1c40f", "#e67e22",
                "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];

            var cal1 = $("#calendar_first");
            var calHeader1 = cal1.find(".calendar_header");
            var weekline1 = cal1.find(".calendar_weekdays");
            var datesBody1 = cal1.find(".calendar_content");

            var cal2 = $("#calendar_second");
            var calHeader2 = cal2.find(".calendar_header");
            var weekline2 = cal2.find(".calendar_weekdays");
            var datesBody2 = cal2.find(".calendar_content");

            var bothCals = $(".calendar");

            var switchButton = bothCals.find(".calendar_header").find('.switch-month');

            var calendars = {
                "cal1": {
                    "name": "first",
                    "calHeader": calHeader1,
                    "weekline": weekline1,
                    "datesBody": datesBody1
                },
                "cal2": {
                    "name": "second",
                    "calHeader": calHeader2,
                    "weekline": weekline2,
                    "datesBody": datesBody2
                }
            }


            var clickedElement;
            var firstClicked,
                secondClicked,
                thirdClicked;
            var firstClick = false;
            var secondClick = false;
            // var selected = {};

            b();
            c(month, year, 0);
            c(nextMonth, nextYear, 1);
            switchButton.on("click", function () {
                var clicked = $(this);
                var generateCalendars = function (e) {
                    var nextDatesFirst = getAdjacentMonth(month, year, e);
                    var nextDatesSecond = getAdjacentMonth(nextMonth, nextYear, e);
                    month = nextDatesFirst[0];
                    year = nextDatesFirst[1];
                    nextMonth = nextDatesSecond[0];
                    nextYear = nextDatesSecond[1];

                    c(month, year, 0);
                    c(nextMonth, nextYear, 1);
                };
                if (clicked.attr("class").indexOf("left") != -1) {
                    generateCalendars("previous");
                } else { generateCalendars("next"); }
                clickedElement = bothCals.find(".calendar_content").find("div");
                console.log("checking");
            });


            //  Click picking stuff
            function getClickedInfo(element, calendar) {
                var clickedInfo = {};
                var clickedCalendar,
                    clickedMonth,
                    clickedYear;
                clickedCalendar = calendar.name;
                //console.log(element.parent().parent().attr('class'));
                clickedMonth = clickedCalendar == "first" ? month : nextMonth;
                clickedYear = clickedCalendar == "first" ? year : nextYear;
                clickedInfo = {
                    "calNum": clickedCalendar,
                    "date": parseInt(element.text()),
                    "month": clickedMonth,
                    "year": clickedYear
                }
                //console.log(clickedInfo);
                return clickedInfo;
            }


            // Finding between dates MADNESS. Needs refactoring and smartening up :)
            function addChosenDates(firstClicked, secondClicked, selected) {
                if (secondClicked.date > firstClicked.date ||
                    secondClicked.month > firstClicked.month ||
                    secondClicked.year > firstClicked.year) {

                    var added_year = secondClicked.year;
                    var added_month = secondClicked.month;
                    var added_date = secondClicked.date;

                    console.log(selected);

                    if (added_year > firstClicked.year) {
                        // first add all dates from all months of Second-Clicked-Year
                        selected[added_year] = {};
                        selected[added_year][added_month] = [];
                        for (var i = 1;
                            i <= secondClicked.date;
                            i++) {
                            selected[added_year][added_month].push(i);
                        }

                        added_month = added_month - 1;
                        console.log(added_month);
                        while (added_month >= 0) {
                            selected[added_year][added_month] = [];
                            for (var i = 1;
                                i <= getDaysInMonth(added_year, added_month);
                                i++) {
                                selected[added_year][added_month].push(i);
                            }
                            added_month = added_month - 1;
                        }

                        added_year = added_year - 1;
                        added_month = 11; // reset month to Dec because we decreased year
                        added_date = getDaysInMonth(added_year, added_month); // reset date as well

                        // Now add all dates from all months of inbetween years
                        while (added_year > firstClicked.year) {
                            selected[added_year] = {};
                            for (var i = 0; i < 12; i++) {
                                selected[added_year][i] = [];
                                for (var d = 1; d <= getDaysInMonth(added_year, i); d++) {
                                    selected[added_year][i].push(d);
                                }
                            }
                            added_year = added_year - 1;
                        }
                    }

                    if (added_month > firstClicked.month) {
                        if (firstClicked.year == secondClicked.year) {
                            console.log("here is the month:", added_month);
                            selected[added_year][added_month] = [];
                            for (var i = 1;
                                i <= secondClicked.date;
                                i++) {
                                selected[added_year][added_month].push(i);
                            }
                            added_month = added_month - 1;
                        }
                        while (added_month > firstClicked.month) {
                            selected[added_year][added_month] = [];
                            for (var i = 1;
                                i <= getDaysInMonth(added_year, added_month);
                                i++) {
                                selected[added_year][added_month].push(i);
                            }
                            added_month = added_month - 1;
                        }
                        added_date = getDaysInMonth(added_year, added_month);
                    }

                    for (var i = firstClicked.date + 1;
                        i <= added_date;
                        i++) {
                        selected[added_year][added_month].push(i);
                    }
                }
                return selected;
            }
        });

    })(jQuery);
}

var dataSelected;
var dataSelectedFormatted;
var arrayDataSelected;

// chama o caledário
function calendarSelection() {

    dataSelectedFormatted = AllDaysSelected

    calendar();
}

// desenha a lista de aulas
function drawingListClasses() {
    var htmlOn = document.querySelector(".listClasses");

    clearListClassses(htmlOn);

    for (const i in AllDaysSelectedValues) {
        htmlOn.innerHTML += `
        
            <li class="list-group drawingListClasses" aria-current="true">
                <div>
                    <span class="material-icons text-color-ergon btn" onclick="RemoveDaLista('${AllDaysSelectedValues[i]}')">remove_circle_outline</span>
                    <span>${AllDaysSelectedValues[i]}</span>
                </div>
            </li>

        `;
    }

    if (htmlOn) {
        // fazer alguma coisa
    }

    return htmlOn;
}

function RemoveDaLista(valueObj) {
    console.log(valueObj);
    var chave = AllDaysSelectedValues.indexOf(valueObj);
    var diasSplice = AllDaysSelectedValues.splice(chave, 1);
    AllDaysSelected.splice(chave, 1);

    diasRemovidos.push(diasSplice[0]);

    calendar();
    drawingListClasses();
}

// limpa a lista de aulas
function clearListClassses(htmlOn) {
    htmlOn.innerHTML = "";
}

// botão de salvar aulas
function btnSalvarAulas() {
    //var getBtn = document.querySelector(".action-save-class");
    console.log("adiciona aulas");
    console.log();
}

var listaDeAulas = [];

function limparAulas() {
    AllDaysSelected = [];
    AllDaysSelectedValues = [];

    drawingListClasses();
    ativarBotao();
    calendar();
}

function salvarAulas() {
    swal("Ok! Aulas Salvas!", {
        icon: "success",
    });
}

function ativarBotao() {
    var temAula = false;
    if (AllDaysSelectedValues.length != 0) {
        temAula = true;
    } else {
        temAula = false
    }

    if (temAula) {
        $(".salvarAulas").attr("disabled", false);
    } else {
        $(".salvarAulas").attr("disabled", true);
    }

    return temAula;
}

function selecionaCalendario() {
    for (const i in arrayThis) {
        $(arrayThis[i]).addClass('selected');
    }
}

function pintaDatas() {
    cal = $("#calendar_first");
    calHeader = cal.find(".calendar_header");
    weekline = cal.find(".calendar_weekdays");
    datesBody = cal.find(".calendar_content");

    console.log(calHeader.find("h2").textContent);
}