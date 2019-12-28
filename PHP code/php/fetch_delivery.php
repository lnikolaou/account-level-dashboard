<?php  

$return_arr = array('res_message' => '', "status" => "success");

$post = [
    'api_id' =>  $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'site_id'   => $_POST['sites'],
 //   'site_id'   => $_POST['sites'],
];


/* Curl to FETCH ACCOUNT delivery  */
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/incapRules/list");
curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json_delivery = curl_exec($ch);
file_put_contents("../export_delivery_rules.json",$json_delivery);
curl_close($ch);

$json_delivery = json_decode($json_delivery);
$return_arr["res_message"] = $json_delivery -> res;
// $return_arr["res_message"] = $json_delivery -> res_message; ISSUE IS THAT res_message does not always exist

// Encoding array in JSON format
echo json_encode($return_arr);

 ?>