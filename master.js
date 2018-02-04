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

window.onload = function() {
  window.scrollTo(0, 1);
  var obj = new colignyYear(Number(params('year')), Boolean(Number(params('metonic'))));
  console.log(obj);
  document.getElementById('cal-title').textContent += obj.months[
                                                        params('month')].name
                                                      + " "
                                                      + params('year')
                                                      + " BG";

 if (params('metonic') == 1) {
    var monthStart = new colignyDate(
                      Number(params('year')), Number(params('month')), 1, true);
  } else {
    var monthStart = new colignyDate(
                      Number(params('year')), Number(params('month')), 1)
  }

  var weekday = monthStart.toGregorianDate().getDay();
  console.log(weekday);
  
  for (var i = 0; i < weekday; i++) {
    var block = document.createElement("DIV");
    var space = document.createTextNode("-");
    var spaceTwo = document.createTextNode("---------------");
    var linebreak = document.createElement("BR");
    var small = document.createElement("small");
    block.appendChild(space);
    block.appendChild(linebreak);
    small.appendChild(spaceTwo);
    small.style.color = "white";
    block.appendChild(small);
    block.className = "calendar-block";
    document.getElementById("cal-body").appendChild(block);
  }

  for (var i = 1; i <= obj.months[Number(params('month'))].days; i++) {
    var block = document.createElement("DIV");
    var space = document.createTextNode(i);
    var small = document.createElement("SMALL");
    var convert = new colignyDate(Number(params('year')), 
                                  Number(params('month')),
                                  i,
                                  Boolean(params('metonic')));
    var greg = convert.toGregorianDate();
    var now = new Date();
    now.setHours(0,0,0,0);
    var convert = document.createTextNode(greg.toISOString().substring(0, 10));
    var linebreak = document.createElement("BR");
    block.appendChild(space);
    small.appendChild(convert);
    block.appendChild(linebreak);
    block.appendChild(small)
    block.className = "calendar-block";
    if (greg.getTime() === now.getTime()) {
      block.className += " today";
    }
    document.getElementById("cal-body").appendChild(block);
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
  var timeText = today.getHours() + ":" + today.getMinutes();
  var timeNode = document.createTextNode(timeText);
  var timeElem = document.createElement("h3");
  timeElem.appendChild(timeNode);
  timeElem.style.fontWeight = "300";
  dateInfo.appendChild(timeElem);
};







