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
  var obj = new colignyYear(Number(params('year')), Boolean(params('metonic')));
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
  
  for (var i = 0; i <= weekday; i++) {
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
    var convert = document.createTextNode(
                  convert.toGregorianDate().toISOString().substring(0, 10));
    var linebreak = document.createElement("BR");
    block.appendChild(space);
    small.appendChild(convert);
    block.appendChild(linebreak);
    block.appendChild(small)
    block.className = "calendar-block";
    document.getElementById("cal-body").appendChild(block);
  }

  var menuStuff = function() {
    var bar = document.getElementById("sidebar");
    var shade = document.getElementById("shader");
    bar.style.visibility = bar.style.visibility == "hidden" ? "visible" : "hidden";
    shade.style.visibility = shade.style.visibility == "hidden" ? "visible" : "hidden";
  }

  document.getElementById("menu").onclick = menuStuff;
  document.getElementById("shader").onclick = menuStuff; 
};







