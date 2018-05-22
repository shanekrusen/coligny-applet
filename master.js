var date = new Date();
  date.setHours(0,0,0,0);
  date = date.toColignyDate(true);
var globalMonth = date.month.index;
var globalYear = date.year;
var globalMet = true;
var obj = new colignyYear(globalYear, globalMet);

var popCal = function() {
  obj = new colignyYear(globalYear, globalMet);
  document.getElementById('cal-title').textContent += obj.months[
                                                        globalMonth].name
                                                      + " "
                                                      + globalYear
                                                      + " BG";

  var monthStart = new colignyDate(globalYear, globalMonth, 1, globalMet);

  var weekday = monthStart.toGregorianDate().getDay();

  for (var i = 0; i < weekday; i++) {
    var x = document.getElementById("table-1").insertCell(-1);
    x.innerHTML = "-"
    x.className = "calendar-block";
  }

  for (var i = 1; i <= obj.months[globalMonth].days; i++) {
    var block = document.createElement("th");
    var space = document.createTextNode(i);
    var small = document.createElement("SMALL");
    var colig = new colignyDate(globalYear, globalMonth, i, globalMet);
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

        for (var o = 0; o < colig.inscription().length; o++) {
          if (colig.inscription()[o].includes("DEC/VOR LUG RIV" || "DEC/VOR LUG RIVRI")) {
            x.className += " lug";
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

  var dayObjs = document.getElementsByClassName('day');

  for (var i = 0; i < dayObjs.length; i++) {
    dayObjs[i].onclick = function() {
      document.getElementById('day-text').innerHTML = "";
      document.getElementById('day-show').style.visibility = "visible";
      var day = this.innerText.replace(/\n.*$/m, "");
      var showDate = new colignyDate(globalYear, globalMonth, Number(day),
                                                              globalMet); 
      var header = document.createElement("h1");
      header.id = "day-head";
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
}

var resetCal = function() {
  document.getElementById("cal-title").innerHTML = '';
  document.getElementById("cal-table").innerHTML = "<tr id='table-1'>"
                                                   + "</tr><tr id='table-2'>"
                                                   + "</tr><tr id='table-3'>"
                                                   + "</tr><tr id='table-4'>"
                                                   + "</tr><tr id='table-5'>"
                                                   + "</tr><tr id='table-6'>"
                                                   + "</tr>"
  popCal();
}

window.onload = function() {
  popCal();
    
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
    if (globalMonth == obj.months.length - 1) {
      globalYear = globalYear + 1;
      globalMonth = 0;
    } else {
      globalMonth = globalMonth + 1;
    }
    resetCal();
  }

  document.getElementById('back').onclick = function() {
    if (globalMonth == 0) {
      obj = new colignyYear(globalYear - 1, globalMet);
      globalYear = globalYear - 1;
      globalMonth = obj.months.length - 1;
    } else {
      globalMonth = globalMonth - 1;
    }
    resetCal();
  }

  document.getElementById('home').onclick = function() {
    globalMonth = date.month.index;
    globalYear = date.year;
    resetCal();
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
  var todayColig = today.toColignyDate(globalMet);
  var todayColigText = todayColig.string() + " BG";
  var todayColigNode = document.createTextNode(todayColigText);
  var todayColigElem = document.createElement("H2");  
  todayColigElem.id = "today-colig-elem";
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

  if (globalMet == true) {
    document.getElementById("metCheck").checked = true;
  }

  document.getElementById("metCheck").onclick = function() {
    if (globalMet == true) {
      globalMet = false;
    } else {
      globalMet = true;
    }
    var todayColigNew = today.toColignyDate(globalMet).string() + " BG";
    document.getElementById('today-colig-elem').innerText = todayColigNew;
    resetCal();
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
    } else {
      var event = { 'name' : name, 
                    'duration' : duration, 
                    'eventStart' : eventStart,
                    'eventEnd' : eventEnd };
      var day = document.getElementById("day-head").innerText;
      day = day.split(/, | /);
      day[0] = globalMonth;
      day = day.join('.');
      var cookString = day + "=" + JSON.stringify(event) + ";";
      console.log(cookString);
      document.cookie = cookString;
      document.getElementById('day-show').style.visibility = 'hidden';
    }
  }

  document.getElementById('jump-year').defaultValue = globalYear;
  document.getElementById('submit-jump').onclick = function() {
    globalYear = Number(document.getElementById('jump-year').value);
    resetCal();
  }
};







