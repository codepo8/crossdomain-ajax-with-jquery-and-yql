$(document).ready(function(){
  $('.ajaxtrigger').click(function(){
    var url = $(this).attr('href');
    if(url.match('^http')){
      return true;
    } else {
      $('#target').load(url);
      return false;
    }
  });
});