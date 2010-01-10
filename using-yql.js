$(document).ready(function(){
  var container = $('#target');
  $('.ajaxtrigger').click(function(){
    doAjax($(this).attr('href'));
    return false;
  });
  function doAjax(url){
    if(url.match('^http')){
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){
          if(data.results[0]){
            var data = filterData(data.results[0]);
            container.html(data);
          } else {
            var errormsg = '<p>Error: could not load the page.</p>';
            container.html(errormsg);
          }
        }
      );
    } else {
      $('#target').load(url);
    }
  }
  function filterData(data){
    data = data.replace(/<?\/body[^>]*>/g,'');
    data = data.replace(/[\r|\n]+/g,'');
    data = data.replace(/<--[\S\s]*?-->/g,'');
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    data = data.replace(/<script.*\/>/,'');
    return data;
  }
});


