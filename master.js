var getUrlParameter = function getUrlParameter(sParam) {
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

if (!getUrlParameter('year') && !getUrlParameter('month')) {
  var date = new Date;
  date = date.toColignyDate(true);
  document.location.search = '?year=' + date.year + '&month=' + date.month.name 
                           + '&metonic=1';
}

$(document).ready(function() {
  document.getElementById('cal-title').textContent += getUrlParameter('month') 
                                                   + " " 
                                                   + getUrlParameter('year');

});
