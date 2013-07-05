$(document).ready(function(){
  var url = $('script').last().attr('src');
  $.get(url,
    function(code){
      console.log(code);
      code=code.replace(/&/mg,'&#38;');
      code=code.replace(/</mg,'&#60;');
      code=code.replace(/>/mg,'&#62;');
      code=code.replace(/\"/mg,'&#34;');
      code=code.replace(/\t/g,'  ');
      code=code.replace(/\r?\n/g,'<br>');
      code=code.replace(/<br><br>/g,'<br>');
      code=code.replace(/ /g,'&nbsp;');
      $('#code').html('<pre><code>'+code+'</code></pre>');
    }
  );
});