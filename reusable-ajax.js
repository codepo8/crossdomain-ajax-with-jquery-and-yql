$(document).ready(function(){
  $('.ajaxtrigger').click(function(){
    $('#target').load($(this).attr('href'));
    return false;
  });
});