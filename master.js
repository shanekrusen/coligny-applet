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
  var date = new Date;
  date = date.toColignyDate(true);
  document.location.search = '?year=' + date.year + '&month=' + date.month.name 
                                                 + '&metonic=1';
}

$(document).ready(function() {
  document.getElementById('cal-title').textContent += params('month') 
                                                   + " " 
                                                   + params('year');
 
 if (params('metonic') == 1) {
    var current = new colignyYear(params('year'), true)
    var monthStart = new colignyDate(params('year'), params('month'), 1, true)
  } else {
    var current = new colignyYear(params('year'))
    var monthStart = new colignyDate(params('year'), params('month'), 1)
  }
  
  var weekday = monthStart.toGregorianDate().getDay();
  
  for (var i = 0; i <= weekday; i++) {
  	
  }
});
