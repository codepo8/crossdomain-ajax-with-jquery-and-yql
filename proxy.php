<?php
$url = $_GET['url'];
$allowedurls = array(
  'http://developer.yahoo.com',
  'http://icant.co.uk'
);
if(in_array($url,$allowedurls)){
  $ch = curl_init(); 
  curl_setopt($ch, CURLOPT_URL, $url); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  $output = curl_exec($ch); 
  curl_close($ch);
  $content = preg_replace('/.*<body[^>]*>/msi','',$output);
  $content = preg_replace('/<\/body>.*/msi','',$content);
  $content = preg_replace('/<?\/body[^>]*>/msi','',$content);
  $content = preg_replace('/[\r|\n]+/msi','',$content);
  $content = preg_replace('/<--[\S\s]*?-->/msi','',$content);
  $content = preg_replace('/<noscript[^>]*>[\S\s]*?<\/noscript>/msi',
                          '',$content);
  $content = preg_replace('/<script[^>]*>[\S\s]*?<\/script>/msi',
                          '',$content);
  $content = preg_replace('/<script.*\/>/msi','',$content);
  echo $content;
} else {
  echo 'Error: URL not allowed to load here.';
}
?>