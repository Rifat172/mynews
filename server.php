<?php
  $link = $_GET['id'];
  $url = "https://www.breakingbadapi.com/api/quote?author=";
  $author = "Jesse+Pinkman";
  if($link=="Jesse"){
    $author = "Jesse+Pinkman";
  }
  if($link=="Walter")
  {
    $author = "Walter+White";
  }
  if($link=="Skyler")
  {
    $author = "Skyler+White";
  }

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $url.$author);

  $response = curl_exec($ch);
  // $data = json_decode($response, true);
  curl_close($ch);

  echo $response;
?>
