$(document).ready(function(){
  var container = $('#target');
  container.attr('tabIndex','-1');
  $('.ajaxtrigger').click(function(){
    var trigger = $(this);
    var url = trigger.attr('href');
    if(!trigger.hasClass('loaded')){
      trigger.append('<span></span>');
      trigger.addClass('loaded');
      var msg = trigger.find('span::last');
    } else {
      var msg = trigger.find('span::last');
    }
    doAjax(url,msg,container);
    return false;
  });
  
  function doAjax(url,msg,container){
    // if the URL starts with http
    if(url.match('^http')){
      // assemble the YQL call
      msg.removeClass('error');
      msg.html(' (loading...)');
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){
          if(data.results[0]){
            var data = filterData(data.results[0]);
            msg.html(' (ready.)');
            container.
              html(data).
                focus().
                  effect("highlight",{},1000);
          } else {
            msg.html(' (error!)');
            msg.addClass('error');
            var errormsg = '<p>Error: could not load the page.</p>';
            container.
              html(errormsg).
                focus().
                  effect('highlight',{color:'#c00'},1000);
          }
        }
      );
    } else {
      $.ajax({
        url: url,
        timeout:5000,
        success: function(data){
          msg.html(' (ready.)');
          container.
            html(data).
              focus().
                effect("highlight",{},1000);
        },
        error: function(req,error){
          msg.html(' (error!)');
          msg.addClass('error');
          if(error === 'error'){error = req.statusText;}
          var errormsg = 'There was a communication error: '+error;
            container.
              html(errormsg).
                focus().
                  effect('highlight',{color:'#c00'},1000);
        },
        beforeSend: function(data){
          msg.removeClass('error');
          msg.html(' (loading...)');
        }
      });
    }
  }
  function filterData(data){
    // filter all the nasties out
    // no body tags
    data = data.replace(/<?\/body[^>]*>/g,'');
    // no linebreaks
    data = data.replace(/[\r|\n]+/g,'');
    // no comments
    data = data.replace(/<--[\S\s]*?-->/g,'');
    // no noscript blocks
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    // no script blocks
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    // no self closing scripts
    data = data.replace(/<script.*\/>/,'');
    // [... add as needed ...]
    return data;
  }
});


