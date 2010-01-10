$(document).ready(function(){
  $('.ajaxtrigger').click(function(){
    var url = $(this).attr('href');
    if(url.match('^http')){
      url = 'proxy.php?url=' + url;
    }
    $('#target').load(url);
    return false;
  });
});