<?php  
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if($_SERVER['REQUEST_METHOD'] == 'POST')  {

$post = [
    'api_id' => $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
    'page_size' => 100,
];


$post_stats = [
    'api_id' => $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
	'stats' => 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
	'time_range' => $_POST['period'],
];


/* CURL to list sites and settings */
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/sites/list");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	curl_close($ch);
		
	$json_decoded = json_decode($json);
	if (json_last_error() === JSON_ERROR_NONE) {
	$json_status = ($json_decoded -> res_message);

    if ( $json_status != "OK" ){
		// AUTHENTICATION ERROR
		file_put_contents("export_sites.json",$json);
//		$return_arr[] = array("status" => $json_status);
    }else{
	$json_object = json_decode($json);
	$json_object_2 = json_decode($json,true);
    $array_sites = [];
	$array_sites = $json_object_2['sites'];


/* generic Function for CURL to list sites and settings for page 2 and above*/
function requestList($pageNb) {
	$post_extra = [
    'api_id' => $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
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
	file_put_contents("export_sites.json",$json_export_sites);

	
/*  curl to get account stats*/ 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/stats/v1");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post_stats));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	file_put_contents("export_account_stats.json",$json);
	curl_close($ch);
	

/* Curl to get the account Info */
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/account");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	file_put_contents("export_account_plan.json",$json);
	curl_close($ch);


    /* Curl to get the account subscription */
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/accounts/subscription");
    curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);
    file_put_contents("export_account_subscriptions.json",$json);
    curl_close($ch);

/* curl to get the list of sub accounts */
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/accounts/listSubAccounts");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	file_put_contents("export_subaccounts.json",$json);
	curl_close($ch);


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/accounts/list");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	file_put_contents("export_account_list.json",$json);
	curl_close($ch);


function requestSitesStats($site_id) {
	$post_stats_sites = [
    'api_id' => $_POST['api_id'],
    'api_key' => $_POST['api_key'],
    'account_id'   => $_POST['account_id'],
    'site_id' => $site_id,
	'stats' => 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
	'time_range' => $_POST['period']
];
	/*  curl to get Site stats*/ 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/stats/v1");
	curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($post_stats_sites));   // post data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json_sites_stats = curl_exec($ch);
	return $json_sites_stats;
	curl_close($ch);
}

/*
THIS PART IS TO RETRIEVE ALL THE PER-SITE STATISTICS

if (isset($_POST['sites_checkbox'])  )
	{
	$array_sites_stats = [];
	$json_site_list = file_get_contents('./export_sites.json');
	$json_site_list_data = json_decode($json_site_list,true);
	foreach ($json_site_list_data as $key1 => $site_id) {
	
//		echo $json_site_list_data[$key1]['domain'], '<br>';
		$json_extra_sites_stats = requestSitesStats($json_site_list_data[$key1]['site_id']);

		$json_extra_sites_stats_2 = json_decode($json_extra_sites_stats,true);
//		echo $json_extra_sites_stats_2['caching']['saved_bytes'], '<br>';
//		$array_sites_stats[$json_site_list_data[$key1]['domain']] = $json_extra_sites_stats_2;
        $array_sites_stats[] = array("domain"=>$json_site_list_data[$key1]['domain'], "stats"=>$json_extra_sites_stats_2);
		// $array_sites_stats = array_merge($array_sites_stats, $json_extra_sites_stats_2);
	}
		$json_export_sites_stats = json_encode($array_sites_stats);
		file_put_contents("export_sites_stats_7_days.json",$json_export_sites_stats);

} else
{
}
*/
 
 $return_arr[] = array("status" => "OK");
 // Encoding array in JSON format
 echo json_encode($return_arr);

} 
}else{
	$return_arr[] = array("status" => "NOK");
	// Encoding array in JSON format
	echo json_encode($return_arr);	
}
}else{
	$return_arr[] = array("status" => "NOK");
	// Encoding array in JSON format
	echo json_encode($return_arr);
}

 ?>