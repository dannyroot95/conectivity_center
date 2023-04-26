<?php

$url = "https://daa-documentos.unamad.edu.pe:8081/api/getStudentInfo/12221015?Token=0Bza1wu0mRptGxoFOt1pg99J2a3EU2rxSNwTlTpw8Q==";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Authorization: Bearer 0Bza1wu0mRptGxoFOt1pg99J2a3EU2rxSNwTlTpw8Q==",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);

?>
