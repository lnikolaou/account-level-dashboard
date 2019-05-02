<?php  

$return_arr = array('res_message' => '', "status" => "success");

$post = [
    'api_id' =>  $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
	'time_range' => $_POST['period'],  
];


/* Curl to FETCH ACCOUNT AUDIT  */
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/accounts/audit");
curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json_audit = curl_exec($ch);
file_put_contents("export_audit.json",$json_audit);
curl_close($ch);

$json_audit = json_decode($json_audit);
$return_arr["res_message"] = $json_audit -> res_message;


// Encoding array in JSON format
echo json_encode($return_arr);

 ?>