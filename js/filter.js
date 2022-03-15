function filterDate() {
    var startDate = document.querySelector("#startDate");
    var endDate = document.querySelector("#endDate");
    var startDate = startDate.value;
    var endDate = endDate.value;
    if (startDate > endDate) {
        notificationGEP('A data de início deve ser menor que a data final!', 'bottom', 'alertDateFilter')
    }else{
        console.log(startDate);
        console.log(endDate);
    }
}

