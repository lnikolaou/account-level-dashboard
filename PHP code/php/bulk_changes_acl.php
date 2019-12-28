<?php  

$site_list = $_POST['site_id_input'];

// POST FOR SITE SETTINGS 
$post = [
    'api_id' =>  $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
    'page_size' => 100,    
];

//START LOOP TO CHANGE ACL
foreach ($site_list as $site_value) {
			$post_status = [
				'api_id' =>  $_POST['api_id'],
				'api_key' => $_POST['api_key'],
				'site_id'   => $site_value,
			];
			

	//   Curl to retrieve old configuration
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/status");
	curl_setopt($ch, CURLOPT_POST, 1);   // set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post_status));  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$acl_json = curl_exec($ch);
	file_put_contents("../old_acl_config.json",$acl_json);
	curl_close($ch);


$acl_json2 = json_decode($acl_json);

$old_ips = [];
if (array_key_exists('acls',$acl_json2 -> security)){
	$acl_rules_1 = $acl_json2 -> security;
	$acl_rules_1 = $acl_rules_1 -> acls;
	foreach($acl_rules_1 -> rules as $acl_rules_2){
		if($acl_rules_2 -> id == "api.acl.blacklisted_ips")
		{
			$old_ips = $acl_rules_2->ips;
		}else{
		}
	}
}else{
}


$old_ips_string = implode( ",", $old_ips );

$new_ips_blacklist = $_POST['ips_url_country'].",".$old_ips_string;


$post_action = [
	'api_id' =>  $_POST['api_id'],
	'api_key' => $_POST['api_key'],
	'site_id'   => $site_value,
	'rule_id'   => $_POST['rule_id'],
	'ips'   =>  $new_ips_blacklist
];	


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/configure/acl");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post_action));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	file_put_contents("../export_acl_config.json",$json);
	curl_close($ch);
}


// Curl to reload site settings 
// generic Function for CURL to list sites and settings for page 2 and above
function requestList($pageNb) {
	$post_extra = [
    'api_id' => $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_nb'],
    'page_size' => 100,
    'page_num' => $pageNb 
];
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/list");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post_extra));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json_extra = curl_exec($ch);
	return $json_extra;
	curl_close($ch);
}


// CURL to list sites and settings 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/list");
curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
curl_close($ch);

$json_object = json_decode($json);
$json_object_2 = json_decode($json,true);
$array_sites = [];

$array_sites = $json_object_2['sites'] or die("<div>Issue with the API Key or Account Permissions</div>");

if (count ($json_object-> sites) == "100") {
	$number_sites = 100;
	$page_count = 1;

	// start pagination loop
	 while ($number_sites == 100) {
	$json_extra = requestList($page_count);
	$json_extra_object_2 = json_decode($json_extra,true);
	$array_sites = array_merge($array_sites, $json_extra_object_2['sites']);
	$number_sites = count($json_extra_object_2['sites']);
	$page_count = $page_count + 1;
	 }

}

$json_export_sites = json_encode($array_sites);
file_put_contents("../export_sites.json",$json_export_sites);

// END CURL to list sites and settings 


$return_arr[] = array("statys" => "success");
// Encoding array in JSON format
echo json_encode($return_arr);


 ?>