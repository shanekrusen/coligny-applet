var params = function params(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

if (!params('year') && !params('month')) {
  var date = new Date();
  date.setHours(0,0,0,0);
  date = date.toColignyDate(true);
  document.location.search = '?year=' + date.year + 
                             '&month=' + date.month.index + '&metonic=1';
}

var notices = [];
var errors = [];

window.onload = function() {
    

  var obj = new colignyYear(Number(params('year')), Boolean(Number(params('metonic'))));
  document.getElementById('cal-title').textContent += obj.months[
                                                        params('month')].name
                                                      + " "
                                                      + params('year')
                                                      + " BG";

  var monthStart = new colignyDate(
                    Number(params('year')), 
                    Number(params('month')), 1, 
                    Boolean(Number(params('metonic'))));

  var weekday = monthStart.toGregorianDate().getDay();

  for (var i = 0; i < weekday; i++) {
    var x = document.getElementById("table-1").insertCell(-1);
    x.innerHTML = "-"
    x.className = "calendar-block";
  }

  for (var i = 1; i <= obj.months[Number(params('month'))].days; i++) {
    var block = document.createElement("th");
    var space = document.createTextNode(i);
    var small = document.createElement("SMALL");
    var colig = new colignyDate(Number(params('year')), 
                                  Number(params('month')),
                                  i,
                                  Boolean(Number(params('metonic'))));
    var greg = colig.toGregorianDate();
    var now = new Date();
    now.setHours(0,0,0,0);
    var options = {year: "numeric", month: "short", day: "numeric"}
    var convert = document.createTextNode(
                    greg.toLocaleDateString("en-US", options));
    var linebreak = document.createElement("BR");
    block.appendChild(space);
    small.appendChild(convert);
    block.appendChild(linebreak);
    block.appendChild(small)
    
    for (var o = 1; o <= 6; o++) {
      if (document.getElementById("table-" + o).childElementCount < 7) {
        var x = document.getElementById("table-" + o).insertCell(-1)
        x.innerHTML = block.innerHTML;
        x.className = "calendar-block day";

        if (greg.getTime() === now.getTime()) {
          x.className += " today";
        }

        for (var o = 0; o < colig.inscription().length; o++) {
          if (colig.inscription()[o] == ("IVOS" || "(IVOS)")) {
            x.className += " ivos";
          }
        }

        for (var o = 0; o < colig.inscription().length; o++) {
          if (colig.inscription()[o].includes("TIOCOBREXTIO")) {
            x.className += " tio";
          }
        }

        break;
      }
    }
  }

  var blockTotal = document.getElementsByClassName("calendar-block").length;  

  five = document.getElementById("table-5");
  six = document.getElementById("table-6");

  if (six.childElementCount == 0) {
    document.getElementById("cal-table").deleteRow(-1);
    var left = 35 - blockTotal;
  } else {
    var left = 42 - blockTotal;
  }
  
  for (let o = 0; o < left; o++) {
    if (five.childElementCount < 7) {
      var y = five.insertCell(-1);
    } else {
      var y = six.insertCell(-1);
    }
    y.innerHTML = "-";
    y.className = "calendar-block";
  }

  var menuStuff = function() {
    var bar = document.getElementById("sidebar");
    var shade = document.getElementById("shader");
    bar.style.visibility = bar.style.visibility == "hidden" ? "visible" : "hidden";
    shade.style.visibility = shade.style.visibility == "hidden" ? "visible" : "hidden";
  }

  var dotMenu = function() {
    var dots = document.getElementById("dot-menu");
    var shade = document.getElementById("shader-two");
    dots.style.visibility = dots.style.visibility == "hidden" ? "visible" : "hidden";
    shade.style.visibility = shade.style.visibility == "hidden" ? "visible" : "hidden";
  }

  document.getElementById("menu").onclick = menuStuff;
  document.getElementById("shader").onclick = menuStuff;
  document.getElementById("dots").onclick = dotMenu;
  document.getElementById("shader-two").onclick = dotMenu;

  document.getElementById('for').onclick = function() {
    if (params('month') == obj.months.length - 1) {
      document.location.search = '?year=' + (Number(params('year')) + 1) + 
                                 '&month=' + 0 + 
                                 '&metonic=' + params('metonic');
    } else {
      document.location.search = '?year=' + params('year') + 
                                 '&month=' + (Number(params('month')) + 1) + 
                                 '&metonic=' + params('metonic');
    }
  }

  document.getElementById('back').onclick = function() {
    if (params('month') == 0) {
      var obj = new colignyYear(Number(params('year') - 1), 
                                Boolean(Number(params('metonic'))));
      document.location.search = '?year=' + (Number(params('year')) - 1) + 
                                 '&month=' + (obj.months.length - 1) + 
                                 '&metonic=' + params('metonic');
    } else {
      document.location.search = '?year=' + params('year') + 
                                 '&month=' + (Number(params('month')) - 1) + 
                                 '&metonic=' + params('metonic');
    }
  }

  document.getElementById('home').onclick = function() {
    document.location.search = "";
  }
  
  var days = ["Sunday", "Monday", "Tuesday", 
              "Wednesday", "Thursday", "Friday", "Saturday"]

  var dateInfo = document.getElementById("date-info");
  var today = new Date();
  var todayDay = days[today.getDay()];
  var todayText = document.createTextNode(todayDay);
  var todayElem = document.createElement("h2")
  todayElem.appendChild(todayText);
  todayElem.style.fontWeight = "200";
  dateInfo.appendChild(todayElem);
  var todayColig = today.toColignyDate();
  var todayColigText = todayColig.string() + " BG";
  var todayColigNode = document.createTextNode(todayColigText);
  var todayColigElem = document.createElement("H2");
  todayColigElem.appendChild(todayColigNode);
  dateInfo.appendChild(todayColigElem);
  var m = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  if (today.getHours() > 12) {
    var timeText = (today.getHours() - 12) + ":" + m + "pm";
  } else {
    var timeText = today.getHours() + ":" + m + "am";
  }
  var timeNode = document.createTextNode(timeText);
  var timeElem = document.createElement("h3");
  timeElem.appendChild(timeNode);
  timeElem.style.fontWeight = "300";
  dateInfo.appendChild(timeElem);

  if (params('metonic') == 1) {
    document.getElementById("metCheck").checked = true;
  }

  document.getElementById("metCheck").onclick = function() {
    if (params('metonic') == 1) {
      document.location.search = '?year=' + params('year') + 
                                 '&month=' + params('month') + 
                                 '&metonic=0';
    } else {
      document.location.search = '?year=' + params('year') + 
                                 '&month=' + params('month') + 
                                 '&metonic=1';
    }
  }

  var dayObjs = document.getElementsByClassName('day');

  for (var i = 0; i < dayObjs.length; i++) {
    dayObjs[i].onclick = function() {
      document.getElementById('day-text').innerHTML = "";
      document.getElementById('day-show').style.visibility = "visible";
      var day = this.innerText.replace(/\n.*$/m, "");
      var showDate = new colignyDate(
                      Number(params('year')), Number(params('month')),
                      Number(day), Boolean(Number(params('metonic')))); 
      var header = document.createElement("h1");
      var headerText = document.createTextNode(showDate.string());
      var inscrip = document.createElement("small");
      var inscripString = "";
      for (y = 0; y < showDate.inscription().length; y++) {
        inscripString += y == 0 ? showDate.inscription()[y] : " " + 
                                  showDate.inscription()[y]
      }
      var inscripText = document.createTextNode(inscripString);
      inscrip.appendChild(inscripText);
      header.appendChild(headerText);
      document.getElementById('day-text').appendChild(header);
      document.getElementById('day-text').appendChild(inscrip);
    }
  }

  document.getElementById('day-close').onclick = function() {
    document.getElementById('day-show').style.visibility = 'hidden';
  }

  document.getElementById('event-submit').onclick = function() {
    var name = document.getElementById('event-name').value;
    var duration = document.getElementById('event-days').value;
    var eventStart = document.getElementById('event-start').value;
    var eventEnd = document.getElementById('event-end').value;

    if ((name || duration || eventStart || eventEnd) == "") {
      alert("Fields cannot be left blank!");
      document.location.search = "";
    } else {
      
    }
  }
};







