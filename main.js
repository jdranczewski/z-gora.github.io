var godziny = [[0, "22:45", "22:48", "22:51", "22:54", "22:57", "23:00", "23:03", "23:06", "23:09", "23:12"],[0, "22:46", "22:49", "22:52", "22:55", "22:58", "23:01", "23:04", "23:07", "23:10", "23:13"],[0, "22:47", "22:50", "22:53", "22:56", "22:59", "23:02", "23:05", "23:08", "23:11", "23:14"]];
$(document).ready(function() {
    var d = new Date();
    currentTime = timeParser(addZero(d.getHours()).toString() + ":" + addZero(d.getMinutes()).toString());
    //startup:
    for(i=0; i<godziny.length; i++) {
        for(j=1; j<godziny[i].length; j++) {
            if(timeParser(godziny[i][j]) >= currentTime) {
                $("#part"+i+" .times").append("<div class='time'>"+godziny[i][j]+"</div>");
            }
        }
    }
    
    prev=0;
    function update() {
        d = new Date();
        currentTime = timeParser(addZero(d.getHours()).toString() + ":" + addZero(d.getMinutes()).toString());
        $("#hour").text(addZero(d.getHours()));
        $("#minutes").text(addZero(d.getMinutes()));
        $("#seconds").text(addZero(d.getSeconds()));
        if(prev!=d.getMinutes()) {
            for (i=0; i<godziny.length; i++) {
                for (j=1; j<godziny[i].length; j++) {
                    if (timeParser(godziny[i][j]) >= currentTime) {
                        nextOne = j;
                        break;
                    }
                }
                //alert(i+" "+nextOne);
                if(j==godziny[i].length) {
                    $("#part"+i+" .countdown span").text("--");
                } else {
                    left = timeParser(godziny[i][nextOne])-currentTime;
                    if (left==0) {
                        wyjscie(i, left);
                    } else {
                        changeTime(i, left);
                    }
                    
                }
            }
        }
        prev = d.getMinutes();
    }
    
    function wyjscie(i, value) {
        $("#part"+i+" .countdown .go").addClass("present");
        setTimeout(function() {$("#part"+i+" .countdown span").text(value);}, 1700);
        setTimeout(function(){ $("#part"+i+" .countdown .go").removeClass("present"); $("#part"+i+" .times .time").first().remove();}, 60000);
    }
    function changeTime(i, value) {
        $("#part"+i+" .countdown span").animate({opacity: 0}, 1000, function() {
            $(this).text(value);
            $(this).animate({opacity: 1}, 1000);
        })
    }
    
    setInterval(update, 1000);
});

//Funkcje pomocnicze
function addZero(num) {
    num = num.toString();
    if (num.length == 1) {
        num = "0"+num;
    }
    return num;
}

function timeParser(timestr) {
    arr = timestr.split(":");
    return 60*parseInt(arr[0])+parseInt(arr[1]);
}

function timeRev(timeint) {
    minuty=timeint%60;
    return Math.floor(timeint/60).toString()+":"+minuty.toString();
}