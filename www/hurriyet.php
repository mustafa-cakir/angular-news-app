<?php

header('Access-Control-Allow-Origin: *');

$curl = curl_init();

$case = $_GET['case'];
$filter = $_GET['filter'];
$id = $_GET['id'];

if ($case == "list") {
	if ($filter == 'ana sayfa') {
		$url = "https://api.hurriyet.com.tr/v1/articles";
	} else {
		$url = "https://api.hurriyet.com.tr/v1/articles?%24filter=Path%20eq%20'/". $filter ."/'";
	}
	
} else {
	$url = "https://api.hurriyet.com.tr/v1/articles/". $id;
}

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
	"accept: application/json",
	"apikey: ccd26a7bceb841d49b0372fe6562c59c"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}